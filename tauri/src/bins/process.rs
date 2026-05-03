use std::ffi::OsStr;

use tauri::Wry;
use tauri_plugin_shell::{
    process::{CommandChild, CommandEvent},
    Shell,
};

pub struct LAMProcess {
    pub name: String,
    pub handle: CommandChild,
}

impl LAMProcess {
    pub fn start<I, S>(shell: &Shell<Wry>, name: String, path: String, args: I) -> LAMProcess
    where
        I: IntoIterator<Item = S>,
        S: AsRef<OsStr>,
    {
        println!("Starting {}...", name);

        let (mut rx, child) = shell
            .command(path)
            .args(args)
            .spawn()
            .expect(format!("Failed to start {}.", name).as_str());

        let name_copy = name.clone();
        tauri::async_runtime::spawn(async move {
            while let Some(event) = rx.recv().await {
                match event {
                    CommandEvent::Stdout(bytes) => {
                        let text = String::from_utf8_lossy(&bytes);
                        println!("{} [stdout]: {}", name_copy, text);
                    }
                    CommandEvent::Stderr(bytes) => {
                        let text = String::from_utf8_lossy(&bytes);
                        eprintln!("{} [stderr]: {}", name_copy, text);
                    }
                    CommandEvent::Error(err) => {
                        eprintln!("{} [error]: {}", name_copy, err);
                    }
                    CommandEvent::Terminated(status) => {
                        println!("{} [process exited]: {:?}", name_copy, status);
                    }
                    _ => {}
                }
            }
        });

        LAMProcess {
            name,
            handle: child,
        }
    }
}
