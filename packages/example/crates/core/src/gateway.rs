use tungstenite::stream::MaybeTlsStream;
use tungstenite::{connect, Message, WebSocket};
use std::net::TcpStream;
use url::Url;

type Socket = WebSocket<MaybeTlsStream<TcpStream>>;

pub fn gateway_connect() -> Result<Socket, ()> {
    let url = Url::parse(&"wss://gateway.discord.gg/?v=10&encoding=json").unwrap();
    let (socket, _response) = connect(url).expect("Can't connect");

    // socket.write_message(
    //   Message::Text(
    //     identify_payload(token, intents).to_string()
    //   )
    // );

    Ok(socket)
}