use std::sync::{Arc, Mutex};

use crate::bins::LAMProcess;

pub struct LAMState {
    pub processes: Arc<Mutex<Vec<LAMProcess>>>
}

impl LAMState {
    pub fn new(mutex: Arc<Mutex<Vec<LAMProcess>>>) -> LAMState {
        LAMState { processes: mutex }
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