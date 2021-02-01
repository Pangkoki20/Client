let events = require("events");
let eventEmitter = new events.EventEmitter();

//listen for event: foo

eventEmitter.on("foo", () => console.log("foo"));
eventEmitter.emit("foo");
