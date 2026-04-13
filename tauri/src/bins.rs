mod service;
mod backend;
mod utils;
mod process;

pub use backend::create_backend_process;
pub use service::gscrap_service::create_gscrap_service_process;
pub use process::LAMProcess;