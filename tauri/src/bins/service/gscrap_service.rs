use std::path::PathBuf;

use tauri::Wry;
use tauri_plugin_shell::Shell;

use crate::bins::{LAMProcess, utils::transform_abstract_path};

pub fn create_gscrap_service_process(shell: &Shell<Wry>, resource_dir: &PathBuf, ack_port: &str) -> LAMProcess {
    let gscrap_resource = resource_dir
        .join("bin")
        .join("service")
        .join("gscrap");

    let gscrap_bin = gscrap_resource.join("gscrap-service.exe");
    let gscrap_bin = transform_abstract_path(gscrap_bin.to_string_lossy().to_string());

    LAMProcess::start(
        shell, 
        String::from("GScrap service"), 
        gscrap_bin, 
        [
            "--cwd",
            &transform_abstract_path(gscrap_resource.to_string_lossy().to_string()),
            "--allow",
            "0.0.0.0",
            "--node-port",
            "0",
            "--grpc-token-secret",
            "secret", // This secret is only for short lived checks so it can be generated every build time
            "--ack",
            "true",
            "--ack-host",
            "127.0.0.1",
            "--ack-port",
            ack_port
        ]
    )
}