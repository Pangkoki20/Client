var net = require("net");
var HOST = "coin.werapun.com";
var PORT = 6969;
var answer = 50;
var i = 50;

var client = new net.Socket();
client.connect(PORT, HOST, function () {
  console.log("CONNECTED TO: " + HOST + ":" + PORT);
  client.write("5935512014");
});

client.on("data", function (data) {
  i++;
  console.log("DATA: " + data);
  if (data.toString() === "OK") {
    answer = Math.floor(Math.random() * 71);
    answer = parseInt(answer);
    client.write(answer.toString());
  } else if (data.toString() === "WRONG") {
    answer = Math.floor(Math.random() * 71);
    answer = parseInt(answer);
    client.write(answer.toString());
  } else if (data.toString() === "BINGO") {
    i / 5;
    console.log("Submit" + i);
    console.log("Submit");
    client.destroy();
  } else {
    client.destroy();
    client.connect(PORT, HOST, function () {
      console.log("CONNECTED TO: " + HOST + ":" + PORT);
      client.write("5935512014");
    });
  }
});

// Add a 'close' event handler for the client socket
client.on("close", function () {
  console.log("Connection closed");
});
