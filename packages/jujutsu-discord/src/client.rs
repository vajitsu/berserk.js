#![deny(clippy::all)]

use crate::utils::JujutsuError;

// TODO: Implement client events later
// use std::collections::HashMap;

use std::panic;

// TODO: Implement client events later
//use std::sync::mpsc;

extern crate colored;
extern crate mio;
extern crate ms;
extern crate tokio;
extern crate tungstenite;

use crate::gateway::{gateway_connect, read_gateway, send_identity};

use napi::bindgen_prelude::*;

// TODO: Implement client events later
// pub struct ClientEvents {
//     events: HashMap<String, Vec<mpsc::Sender<String>>>,
// }

#[derive(Debug)]
#[napi(object)]
pub struct ClientOptions {
    pub token: String,
    pub intents: Vec<i32>,
}

#[napi(object)]
pub struct Client {
    pub token: String,
    pub intents: Vec<i32>,
    pub destroy: JsFunction,
}

// TODO: Implement client events later
// impl ClientEvents {
//     fn new() -> ClientEvents {
//         ClientEvents {
//             events: HashMap::new(),
//         }
//     }

//     fn on(&mut self, event: String, sender: mpsc::Sender<String>) {
//         let vec = self.events.entry(event).or_default();
//         vec.push(sender);
//     }

//     fn emit(&self, event: String, data: String) {
//         if let Some(vec) = self.events.get(&event) {
//             for sender in vec {
//                 sender.send(data.clone()).unwrap();
//             }
//         }
//     }
// }

#[tokio::main]
#[napi]
pub async fn create_client(options: ClientOptions) -> Result<()> {
    // panic::set_hook(Box::new(|info| {
    //   // Get the panic message
    //   let message = info.message().expect("Error while reading panic info").as_str().unwrap_or_else(|| "Unknown panic");

    //   println!("{} - {}", "error".red(), message);

    //   // Get the backtrace
    //   // let backtrace = info.location().expect("Error while reading panic info").as_str().unwrap_or_default();
    // }));

    let _result = panic::catch_unwind(|| {
        // Connect to Discord Gateway
        let mut socket =
            gateway_connect().expect("Panic occurred while attempting to connecting to gateway");

        send_identity(&mut socket, &options)
            .and_then(|()| -> std::result::Result<(), JujutsuError> {
                loop {
                    read_gateway(&mut socket)
                        .expect("Panic occurred while reading gateway message");
                }
            })
            .expect("Panic occurred while sending identity to gateway");
    });

    Ok(())
}
