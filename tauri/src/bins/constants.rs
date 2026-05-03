#[cfg(debug_assertions)]
pub const ALLOWED_ORIGIN: &str = "http://localhost:1420";

#[cfg(not(debug_assertions))]
pub const ALLOWED_ORIGIN: &str = "http://tauri.localhost";