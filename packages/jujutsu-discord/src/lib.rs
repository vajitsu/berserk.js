#![recursion_limit = "2048"]
#![deny(clippy::all)]
#![feature(box_patterns)]
#![feature(panic_info_message)]

#[macro_use]
extern crate napi_derive;
extern crate tokio;

pub mod client;
pub mod constants;
pub mod gateway;
pub mod utils;

#[napi]
pub fn hello_world() -> &'static str {
    "Hello World!"
}
