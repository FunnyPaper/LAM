use std::path::PathBuf;
use tauri::Wry;
use tauri_plugin_shell::Shell;

use crate::bins::LAMProcess;

use super::utils::transform_abstract_path;

pub fn create_backend_process(shell: &Shell<Wry>, resource_dir: &PathBuf, grpc_port: &str, ack_port: &str) -> LAMProcess {
    let backend_resource = resource_dir
        .join("bin")
        .join("backend");

    let backend_bin = backend_resource.join("lam-backend.exe");
    let backend_bin = transform_abstract_path(backend_bin.to_string_lossy().to_string());

    LAMProcess::start(
        shell, 
        String::from("Backend"), 
        backend_bin, 
        [
            "--cwd",
            &transform_abstract_path(backend_resource.to_string_lossy().to_string()),
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
            "http://localhost:1420" // Could be derived from tauri configuration
        ]
    )
}