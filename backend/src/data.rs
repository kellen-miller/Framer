use std::{
    collections::HashMap,
    sync::Mutex, // Use Mutex for thread-safe access to a variable e.g. our DATA data.
};

// Use once_cell for creating a global variable e.g. our DATA data.
use once_cell::sync::Lazy;

// Bring Book struct into scope
use crate::book::Book;

// Create a data store as a global variable with `Lazy` and `Mutex`.
// This demo implementation uses a `HashMap` for ease and speed.
// The map key is a primary key for lookup; the map value is a Book.
pub static DATA: Lazy<Mutex<HashMap<u32, Book>>> = Lazy::new(|| Mutex::new(
    HashMap::from([
        (1, Book {
            id: 1,
            title: "Antigone".into(),
            author: "Sophocles".into(),
        }),
        (2, Book {
            id: 2,
            title: "Beloved".into(),
            author: "Toni Morrison".into(),
        }),
        (3, Book {
            id: 3,
            title: "Candide".into(),
            author: "Voltaire".into(),
        }),
        (4, Book {
            id: 4,
            title: "Lord of the Rings".into(),
            author: "J.R.R. Tolkein".into(),
        }),
    ])
));