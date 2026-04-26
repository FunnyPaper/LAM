use tauri::State;

use crate::utils::{AppStatus, LAMState};

#[tauri::command]
pub async fn initialize(state: State<'_, LAMState>) -> Result<String, String> {
  let mut rx = state.status_rx.clone();

  loop {
    let current_status = rx.borrow().clone();

    match current_status {
        AppStatus::Ready(port) => return Ok(port),
        AppStatus::Error(err) => return Err(err),
        AppStatus::Loading => {
            if rx.changed().await.is_err() {
                return Err("Internal channel has been closed".into());
            }
        }
    }
  }
}