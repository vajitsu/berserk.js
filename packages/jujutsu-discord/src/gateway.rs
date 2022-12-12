#![deny(clippy::all)]

use crate::utils::JujutsuError;

extern crate colored;
extern crate ms;

use std::net::TcpStream;
use std::thread;
use std::time::Duration;

use crate::client::ClientOptions;
use crate::constants::gateway_url;
use crate::utils::{heartbeat_payload, identify_payload, log_error, log_info, parse_payload};

use tungstenite::stream::MaybeTlsStream;
use tungstenite::{connect, Message, WebSocket};

use url::Url;

use colored::*;
use ms::*;

type Socket = WebSocket<MaybeTlsStream<TcpStream>>;

pub fn send_heartbeat(socket: &mut Socket) -> Result<(), JujutsuError> {
    socket
        .write_message(tungstenite::Message::Text(heartbeat_payload().to_string()))
        .expect("Error occured while writing to gateway");
    Ok(())
}

#[allow(unreachable_code)]
pub fn start_heartbeats(socket: &mut Socket, heartbeat_interval: u64) -> Result<(), JujutsuError> {
    let interval = Duration::from_millis(heartbeat_interval);

    loop {
        send_heartbeat(socket).expect("Error occured while sending heartbeat"); // call the function

        thread::sleep(interval); // wait for the specified interval
    }

    Ok(())
}

pub fn send_identity(socket: &mut Socket, options: &ClientOptions) -> Result<(), JujutsuError> {
    // Write to socket
    socket
        .write_message(Message::Text(
            identify_payload(&options.token, &options.intents).to_string(),
        ))
        .expect("Panic occurred while sending identity to gateway");

    Ok(())
}

#[allow(unreachable_code)]
pub fn read_gateway(socket: &mut Socket) -> Result<(), JujutsuError> {
    let mut heartbeats = 0;

    loop {
        let msg = socket.read_message().expect("Error reading message");

        let json = parse_payload(&msg).expect("Error parsing payload");

        if json["error"] == true {
            let reason = String::from(
                json["reason"]
                    .as_str()
                    .expect("Error while reading payload"),
            );

            if !reason.is_empty() {
                log_error(&reason).expect("Error while logging error");
            }
        } else if json["heartbeat"] == true {
            if json["ack"] == true {
                let msg = format!("Heartbeat acknowledged. [{}]", heartbeats);

                log_info(&msg).expect("Panic occurred while logging heartbeat");

                heartbeats += 1
            } else {
                let interval_in_ms = json["interval"]
                    .as_u64()
                    .expect("Error while transforming `interval` into number");
                let interval = ms!(interval_in_ms, true);
                let heartbeat_message = format!("Heartbeat: {}", interval);

                log_info(&heartbeat_message).expect("Error while logging heartbeat");
            }
        } else if json["event"] == true {
            let name_raw = String::from(
                json["name"]
                    .as_str()
                    .expect("Error while parsing event name"),
            )
            .replace('\u{005f}', " ");
            let name = titlecase::titlecase(&name_raw);
            println!("{} - {}", "event".magenta(), name);
        } else {
            println!("{} - {:?}", "event".magenta(), json);
        }
    }
    Ok(())
}

pub fn gateway_connect() -> Result<Socket, JujutsuError> {
    let url = Url::parse(&gateway_url()).unwrap();
    let (socket, _response) = connect(url).expect("Can't connect");

    // socket.write_message(
    //   Message::Text(
    //     identify_payload(token, intents).to_string()
    //   )
    // );

    Ok(socket)
}
