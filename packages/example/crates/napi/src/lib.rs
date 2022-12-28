#![recursion_limit = "2048"]
//#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use std::{env, panic::set_hook, sync::Arc};

use backtrace::Backtrace;
use fxhash::FxHashSet;

use futures::prelude::*;
use napi::bindgen_prelude::*;

#[derive(Debug)]
#[napi(js_name = "JujutsuClient")]
pub struct JujutsuClient {
  token: String
}

#[napi]
impl JujutsuClient {
  #[napi(constructor)]
  pub fn new() -> Self {
    JujutsuClient { token: String::from("") }
  }

  #[napi]
  pub fn login(&mut self, token: String) -> napi::Result<&str> {
    self.token = token;
    Ok(&self.token)
  }

  #[napi(getter)]
  pub fn token(&self) -> napi::Result<&str> {
    Ok(&self.token)
  }
}