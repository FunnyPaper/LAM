mod backend;
mod process;
mod service;
mod utils;
mod constants;

pub use backend::create_backend_process;
pub use process::LAMProcess;
pub use service::gscrap_service::create_gscrap_service_process;
