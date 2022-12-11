#![deny(clippy::all)]

extern crate colored;
use colored::*;

extern crate rand;
use rand::Rng;

use serde_json::{Result as SerdeResult, Value as SerdeValue};

pub fn string_to_json(string: &str) -> SerdeResult<SerdeValue> {
    let v: SerdeValue = serde_json::from_str(string).expect("Error while parsing string");
    Ok(v)
}

pub fn jitter() -> f64 {
    let mut rng = rand::thread_rng();
    let random_number = rng.gen::<f64>();
    random_number
}

pub fn websocket_url(api_version: u8, encoding: &str) -> std::string::String {
    format!(
        "wss://gateway.discord.gg/?v={}&encoding={}",
        api_version, encoding
    )
}

pub fn identify_payload(token: &str, intents: &Vec<i32>) -> serde_json::Value {
    let mut sum = 0;
    for n in intents {
        sum += n;
    }

    let payload = serde_json::json!({
        "op": 2,
        "d": {
          "token": token,
          "intents": &sum,
          "properties": {
            "$os": ::std::env::consts::OS,
            "$browser": "Jujutsu.js",
            "device": "jujutsu-js"
          }
        }
    });
    payload
}

pub fn heartbeat_payload() -> serde_json::Value {
    let payload = serde_json::json!({
      "op": 1,
      "d": 251
    });
    payload
}

pub fn parse_payload(message: &tungstenite::Message) -> Result<SerdeValue, ()> {
    if message.is_text() {
        let mut message_json = string_to_json(
            message
                .to_text()
                .expect("Error while reading payload message"),
        )
        .expect("Error while parsing payload");

        println!("{:?}", message_json);

        // Heartbeat
        if message_json["op"] == 10 {
            let json = format!(
                r#"{{ "heartbeat": true, "interval": {} }}"#,
                message_json["d"]["heartbeat_interval"]
            );

            Ok(string_to_json(&json).expect("Error while parsing payload [op == 10]"))
        } else if message_json["op"] == 11 {
            let json = r#"{ "heartbeat": true, "ack": true }"#;

            Ok(string_to_json(json).expect("Error while parsing payload [op = 11]"))
        } else if message_json["t"].is_null() != true {
            message_json["d"]["_trace"].take();

            let event_name = message_json["t"]
                .as_str()
                .expect("Error while parsing event name");
            let json = format!(
                r#"{{ "event": true, "name": "{}", "data": {} }}"#,
                event_name.to_ascii_lowercase(),
                message_json["d"]
            );
            let err_msg = format!("Error while parsing payload t=[{}]", event_name);

            Ok(string_to_json(&json).expect(&err_msg))
        } else {
            Ok(message_json)
        }
    } else if message.is_close() {
        Ok(serde_json::json!({
          "error": true,
          "reason": message.to_text().expect("Error while reading payload message")
        }))
    } else {
        Ok(serde_json::from_str(r#"{}"#).expect("Error while parsing payload"))
    }
}

pub fn log_error(message: &str) -> Result<(), ()> {
    println!("{} - {}", "error".red(), message);
    Ok(())
}

pub fn log_info(message: &str) -> Result<(), ()> {
    println!("{} - {}", "info".cyan(), message);
    Ok(())
}
