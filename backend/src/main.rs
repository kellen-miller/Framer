use std::{
    collections::HashMap,
    env,
    net::SocketAddr,
    thread,
};

use axum::{
    extract::{
        Json,
        Path,
        Query,
    },
    handler::Handler,
    http::{
        StatusCode,
        Uri,
    },
    response::Html,
    Router,
    routing::get,
    Server,
};
use migration::{
    Migrator,
    MigratorTrait,
    SchemaManager,
};
use sea_orm::{
    Database,
    DatabaseConnection,
    DbErr,
};
use tracing_subscriber::{
    fmt::layer,
    layer::SubscriberExt,
    util::SubscriberInitExt,
};

use crate::book::Book;
use crate::data::DATA;

mod book;
mod data;

#[tokio::main]
pub async fn main() {
    let addr = "[::]:8080".parse::<SocketAddr>().unwrap();

    // Start tracing.
    tracing_subscriber::registry()
        .with(layer())
        .init();

    // Enable cors
    // let cors_layer = CorsLayer::new()
    //     .allow_methods(Any)
    //     .allow_origin(Any)
    //     .allow_headers(Any);

    // Create books route
    let book_routes = Router::new()
        .route("/",
               get(get_books)
                   .put(put_books))
        .route("/:id",
               get(get_books_id)
                   .delete(delete_books_id));


    // Create app router
    let app_routes = Router::new()
        .nest("/books", book_routes)
        .fallback(fallback.into_service());
    // .layer(ServiceBuilder::new().layer(cors_layer));

    Server::bind(&addr)
        .serve(app_routes.into_make_service())
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();

    // Create database connection
    let db_url = get_db_url();
    let db = Database::connect(db_url)
        .await
        .expect("Failed to connect to database");
    // Migrator::up(&db, None).await.unwrap();
    run_migrations(db).await.unwrap();
    println!("Connected to database!!!!");
}

pub fn get_db_url() -> String {
    let user = env::var("DB_USER").expect("DB_USER not set");
    let password = env::var("DB_PASSWORD").expect("DB_PASSWORD not set");
    let db_name = env::var("DB_NAME").expect("DB_NAME not set");
    let db_host = env::var("DB_HOST").expect("DB_HOST not set");
    let db_port = env::var("DB_PORT").expect("DB_PORT not set");
    return format!("postgres://{}:{}@{}:{}/{}", user, password, db_host, db_port, db_name);
}

pub async fn run_migrations(db: DatabaseConnection) -> Result<(), DbErr> {
    let schema_manager = SchemaManager::new(&db); // To investigate the schema
    Migrator::up(&db, None).await.unwrap();
    assert!(schema_manager.has_table("books").await?);
    Ok(())
}


/// axum handler for "GET /books" which responds
/// of all books in the database formatted as a json array of books.
/// This demo uses our DATA; a production app could use a database.
/// This demo must clone the DATA in order to sort items by title.
/// If the query parameters contain a "sort" parameter, then sort the books by that field if it exists.
/// If the query parameters contain a "limit" parameter, then limit the books to that number after sorting.
pub async fn get_books(Query(params): Query<HashMap<String, String>>) -> Json<Vec<Book>> {
    thread::spawn(move || {
        let data = DATA.lock().unwrap();
        let mut books_vec: Vec<Book> = Vec::new();
        for (_, book) in data.iter() {
            books_vec.push(book.clone());
        }

        match params.get("sort") {
            Some(sort_param) => {
                match sort_param.as_str() {
                    "title" => books_vec.sort_by(|a, b| a.title.cmp(&b.title)),
                    "author" => books_vec.sort_by(|a, b| a.author.cmp(&b.author)),
                    _ => books_vec.sort_by(|a, b| a.title.cmp(&b.title)),
                }
            }
            None => books_vec.sort_by(|a, b| a.title.cmp(&b.title)),
        }

        match params.get("limit") {
            Some(limit_param) => {
                let limit = limit_param.parse::<usize>().unwrap();
                books_vec = books_vec.into_iter().take(limit).collect();
            }
            None => (),
        }
        Json(books_vec)
    }).join().unwrap().into()
}


/// axum handler for "GET /books/:id" which responds with json
/// of the book with the given id or 404 if not found.
/// This demo uses our DATA; a production app could use a database.
/// This demo must clone the book in order to return a copy.
pub async fn get_books_id(Path(id): Path<u32>) -> Json<Book> {
    thread::spawn(move || {
        let data = DATA.lock().unwrap();
        let book = data.get(&id).cloned();
        match book {
            Some(book) => Json(book),
            None => Json(Book {
                id: 0,
                title: "".to_string(),
                author: "".to_string(),
            }),
        }
    }).join().unwrap().into()
}

/// axum handler for "PUT /books" which creates a new book resource.
/// This demo shows how axum can extract JSON data into a Book struct.
pub async fn put_books(Json(book): Json<Book>) -> Html<String> {
    thread::spawn(move || {
        let mut data = DATA.lock().unwrap();
        data.insert(book.id, book.clone());
        format!("Put book: {}", &book)
    }).join().unwrap().into()
}

/// axum handler for "DELETE /books/:id" which destroys a resource.
/// This demo extracts an id, then mutates the book in the DATA store.
pub async fn delete_books_id(Path(id): Path<u32>) -> Html<String> {
    thread::spawn(move || {
        let mut data = DATA.lock().unwrap();
        if data.contains_key(&id) {
            data.remove(&id);
            format!("Delete book id: {}", &id)
        } else {
            format!("Book id not found: {}", &id)
        }
    }).join().unwrap().into()
}

/// axum handler for any request that fails to match the router routes.
/// This implementation returns HTTP status code Not Found (404).
pub async fn fallback(uri: Uri) -> (StatusCode, String) {
    (StatusCode::NOT_FOUND, format!("No route {}", uri))
}

/// Tokio signal handler that will wait for a user to press CTRL+C.
/// We use this in our hyper `Server` method `with_graceful_shutdown`.
async fn shutdown_signal() {
    tokio::signal::ctrl_c()
        .await
        .expect("expect tokio signal ctrl-c");
    println!("signal shutdown");
}