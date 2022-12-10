#![deny(clippy::all)]

pub fn websocket_url(api_version: i32, encoding: String) -> std::string::String {
  format!("wss://gateway.discord.gg/?v={}&encoding={}", api_version, encoding)
}

use serde_json::{json};

pub fn identify_payload(token: String, intents: Vec<i32>) -> serde_json::Value {
  let mut sum = 0;
  for n in &intents {
      sum += n;
  }
  
  let payload = json!({
      "op": 2,
      "d": {
        "token": &token,
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