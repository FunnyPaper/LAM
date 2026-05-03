use tauri::State;

use crate::utils::{LAMState, kill_all_processes};

#[tauri::command]
pub async fn shutdown(state: State<'_, LAMState>) -> Result<(), ()> {
    state.token.cancel();
    kill_all_processes(&state.processes.clone());
    Ok(())
}
