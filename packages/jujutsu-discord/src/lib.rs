#![recursion_limit = "2048"]
#![deny(clippy::all)]
#![feature(box_patterns)]

#[macro_use]
extern crate napi_derive;

pub mod gateway;
pub mod utils;
pub mod log;

#[napi]
pub fn hello_world()-> &'static str {
  "Hello World!"
}