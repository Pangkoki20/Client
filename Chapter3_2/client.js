let net = require("net");
let HOST = "127.0.0.1";
let POST = 6969;

let client = new net.Socket();

client.connect(POST, HOST);
