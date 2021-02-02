var net = require("net");
var HOST = "localhost";
var PORT = 6969;
var answer = 0;
var i = 0;

var client = new net.Socket();
client.connect(PORT, HOST, function () {
  console.log("CONNECTED TO: " + HOST + ":" + PORT);
  client.write("5935512014C");
});

client.on("data", function (data) {
  console.log("Server: " + data);
  i++;
  //console.log('input'+i.toString())
  if (data == "OK") {
    answer = Math.floor(Math.random() * 21);
    answer = parseInt(answer);
    client.write(answer.toString());
  } else if (data == "WRONG") {
    answer = Math.floor(Math.random() * 21);
    answer = parseInt(answer);
    client.write(answer.toString());
  } else if (data == "BINGO") {
    i / 5;
    console.log("You submit " + i);
    console.log("You Sunmit");
    client.destroy();
  } else if (data == "END") {
    client.destroy();
    client.connect(PORT, HOST, function () {
      console.log("CONNECTED TO: " + HOST + ":" + PORT);
      client.write("5935512014C");
    });
  }
});
// Add a 'close' event handler for the client socket
client.on("close", function () {
  console.log("Connection closed");
});
