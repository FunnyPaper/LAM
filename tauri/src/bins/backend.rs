use std::path::PathBuf;
use tauri::Wry;
use tauri_plugin_shell::Shell;

use crate::bins::{LAMProcess, constants::ALLOWED_ORIGIN};

use super::utils::transform_abstract_path;

pub fn create_backend_process(
    shell: &Shell<Wry>,
    data_dir: &PathBuf,
    resource_dir: &PathBuf,
    grpc_port: &str,
    ack_port: &str,
) -> LAMProcess {
    let app_data_dir = data_dir.join("backend");
    std::fs::create_dir_all(&app_data_dir).expect("Failed to create app data directory for backend");

    let backend_resource = resource_dir.join("bin").join("backend");

    let backend_bin = backend_resource.join("lam-backend.exe");
    let backend_bin = transform_abstract_path(backend_bin.to_string_lossy().to_string());

    LAMProcess::start(
        shell,
        String::from("Backend"),
        backend_bin,
        [
            "--cwd",
            &transform_abstract_path(backend_resource.to_string_lossy().to_string()),
            "--app-dir",
            &transform_abstract_path(app_data_dir.to_string_lossy().to_string()),
            "--node-port",
            "0",
            "--grpc-host",
            "127.0.0.1",
            "--grpc-port",
            grpc_port,
            "--grpc-token-secret",
            "secret", // This secret is only for short lived checks so it can be generated every build time
            "--ack",
            "true",
            "--ack-host",
            "127.0.0.1",
            "--ack-port",
            ack_port,
            "--origin",
            ALLOWED_ORIGIN, // Could be derived from tauri configuration
        ],
    )
}
