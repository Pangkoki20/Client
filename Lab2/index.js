// fs = require("fs");  //fs ดึงไฟล์-เขียนไฟล์ได้ทั้งหมด
// fs.readFile("text.txt", (err, data) => {
//   if (err) return console.error(err);
//   console.log(data.toString());
// });
// console.log("Finished");
//callbackFunction การดึงข้อมูลเป็นเวลานาน
/*------------------------------------*/

// console.log("a: ");
// let stdin = process.openStdin(); //ตัวแปร obj
// stdin.addListener("data", (a) => { //เปิดรับ input
// console.log(a.toString().trim())
//   console.log("b: ");
//   stdin.addListener("data", (b) => {
//     console.log(a * b);
//     stdin.destroy();
//   });
// });
/*------------------------------------*/

// let stdin = process.openStdin();
// let a = 1;

// const main = () => {
//   console.log("a: ");
//   stdin.addListener("data", getA);
// };

// const getA = (num) => {
//   a = num.toString().trim();
//   console.log("a = " + a);
//   console.log("b: ");
//   stdin.addListener("data", getB);
// };

// const getB = (b) => {
//   console.log("a = " + a.toString().trim());
//   console.log("b = " + b.toString().trim());
//   console.log("a*b =  " + a * b);
//   stdin.destroy();
// };

// main();
/*------------------------------------*/

var net = require("net"); //libra ชื่อ net

var HOST = "127.0.0.1"; //localhost
var PORT = 6969;
net
  .createServer(function (sock) {
    console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);
    sock.on("data", function (data) {
      console.log("DATA " + sock.remoteAddress + ": " + data);
      sock.write('You said "' + data + '"');
    });

    sock.on("close", function (data) {
      console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
    });
  })
  .listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);
