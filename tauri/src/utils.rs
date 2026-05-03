use std::sync::{Arc, Mutex};

use tokio::sync::watch;

use crate::bins::LAMProcess;
use tokio_util::sync::CancellationToken;

#[derive(Clone)]
pub enum AppStatus {
    Loading,
    Ready(String),
    Error(String),
}

pub struct LAMState {
    pub processes: Arc<Mutex<Vec<LAMProcess>>>,
    pub token: CancellationToken,
    pub status_rx: watch::Receiver<AppStatus>,
}

impl LAMState {
    pub fn new(mutex: Arc<Mutex<Vec<LAMProcess>>>, token: CancellationToken, rx: watch::Receiver<AppStatus>) -> LAMState {
        LAMState {
            processes: mutex,
            token: token,
            status_rx: rx,
        }
    }
}

pub fn kill_all_processes(processes: &Arc<Mutex<Vec<LAMProcess>>>) {
    if let Ok(mut processes) = processes.lock() {
        for child in processes.drain(..) {
            let _ = child.handle.kill();
            println!("{} process stopped.", child.name);
        }

        println!("All processes have been stopped.");
    }
}
