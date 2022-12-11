#![deny(clippy::all)]

use crate::utils::websocket_url;

pub const API_VERSION: u8 = 10;
pub const API_ENCODING: &str = "json";
pub fn gateway_url() -> String {
    websocket_url(API_VERSION, API_ENCODING)
}

/// Enum to map gateway opcodes.
#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq, PartialOrd, Ord)]
#[non_exhaustive]
pub enum OpCode {
    /// Dispatches an event.
    Event = 0,
    /// Used for ping checking.
    Heartbeat = 1,
    /// Used for client handshake.
    Identify = 2,
    /// Used to update the client status.
    StatusUpdate = 3,
    /// Used to join/move/leave voice channels.
    VoiceStateUpdate = 4,
    /// Used for voice ping checking.
    VoiceServerPing = 5,
    /// Used to resume a closed connection.
    Resume = 6,
    /// Used to tell clients to reconnect to the gateway.
    Reconnect = 7,
    /// Used to request guild members.
    GetGuildMembers = 8,
    /// Used to notify clients that they have an invalid session Id.
    InvalidSession = 9,
    /// Sent immediately after connection, contains heartbeat + server info.
    Hello = 10,
    /// Sent immediately following a client heartbeat that was received.
    HeartbeatAck = 11,
    /// Unknown opcode.
    Unknown = !0,
}
