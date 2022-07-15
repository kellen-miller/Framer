pub use sea_orm_migration::prelude::*;

// Add each migration file as a module
mod m20220714_000001_create_books_table;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220714_000001_create_books_table::Migration),
        ]
    }
}
