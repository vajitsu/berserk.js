#![deny(clippy::all)]

use crate::utils::identify_payload;

#[napi]
async fn gateway_connect(token: String, intents: Vec<i32>) -> Result<(), napi::Error> {
  println!("{}", identify_payload(token, intents).to_string());
  Ok(())
}