mod bins;
mod utils;
mod commands;

use core::panic;
use std::{sync::{Arc, Mutex}};

use tauri::{AppHandle, Manager, RunEvent, State};
use tauri_plugin_shell::ShellExt;
use tokio::{io::{AsyncReadExt, AsyncWriteExt}, net::TcpListener, sync::watch};
use tokio_util::sync::CancellationToken;

use crate::{bins::LAMProcess, commands::initialize, utils::{AppStatus, LAMState, kill_all_processes}};

async fn create_subprocesses(app: AppHandle, tx: watch::Sender<AppStatus>) {
    let state: State<LAMState> = app.state();
    let resource_dir = app
        .path()
        .resource_dir()
        .expect("Failed to resolve resource dir.");

    let listener = TcpListener::bind("127.0.0.1:0").await.expect("Could not bind port.");
    let main_port = listener.local_addr().unwrap().port();

    let gscrap_process = bins::create_gscrap_service_process(
        &app.shell(), 
        &resource_dir,
        &main_port.to_string()
    );

    let (mut socket1, _addr1) = listener.accept().await.expect("Could not accept socket 1.");
    let mut buf1 = [0; 1024];
    let n = socket1.read(&mut buf1).await.expect("Error reading process.");
    let _ = socket1.shutdown().await;
    let grpc_port: String = String::from_utf8_lossy(&buf1[..n])
        .trim()
        .strip_prefix("PORT=")
        .unwrap()
        .parse()
        .unwrap();

    let backend_proceess = bins::create_backend_process(
        &app.shell(),
        &resource_dir,
        &grpc_port.to_string(),
        &main_port.to_string()
    );

    let (mut socket2, _addr2) = listener.accept().await.expect("Could not accept socket 2.");
    let mut buf2 = [0; 1024];
    let n = socket2.read(&mut buf2).await.expect("Error reading process.");
    let _ = socket2.shutdown().await;
    let backend_port: String = String::from_utf8_lossy(&buf2[..n])
        .trim()
        .strip_prefix("PORT=")
        .unwrap()
        .parse()
        .unwrap();

    if let Ok(mut processes) = state.processes.lock() {
        processes.push(gscrap_process);
        processes.push(backend_proceess);
    };

    let _ = tx.send(AppStatus::Ready(backend_port));
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let token = CancellationToken::new();
    let token_for_setup = token.clone();
    let token_for_ctrlc = token.clone();
    let token_for_panic = token.clone();

    let processes = Arc::new(Mutex::new(Vec::<LAMProcess>::new()));

    let ctrlc_processes = processes.clone();
    let _ = ctrlc::set_handler(move || {
        println!("Termination signal received. Clearing...");
        token_for_ctrlc.cancel();
        kill_all_processes(&ctrlc_processes);
        std::process::exit(0);
    });

    let panic_processes = processes.clone();
    let default_panic_hook = std::panic::take_hook();
    std::panic::set_hook(Box::new(move |info| {
        println!("Critical error happened. Cleaning...");
        token_for_panic.cancel();
        kill_all_processes(&panic_processes);
        default_panic_hook(info);
    }));

    let (tx, rx) = watch::channel(AppStatus::Loading);

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![initialize])
        .manage(LAMState::new(processes.clone(), rx))
        .setup(move |app| {
            let app_handle = app.app_handle().clone();
            let token_for_task = token_for_setup.clone();

            tauri::async_runtime::spawn(async move {
                tokio::select! {
                    _ = token_for_task.cancelled() => {
                        println!("Create subprocess task has been cancelled.")
                    }
                    _ = create_subprocesses(app_handle, tx) => {
                        println!("Created all subprocesses.")
                    }
                }
            });
            
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("Error while building tauri application.")
        .run(move |_app_handle, event| {
            if let RunEvent::Exit = event {
                println!("Tauri app is closing. Cleaning...");
                token.cancel();
                kill_all_processes(&processes);
            } 
        })
}
