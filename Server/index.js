const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;

let tasks = [
  { id: 1, name: "A", age: "2" },
  { id: 2, name: "B", age: "2" },
  { id: 3, name: "C", age: "2" },
  { id: 4, name: "D", age: "2" },
];

app.use(cors());

app.get("/", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => console.log(`listen at ${PORT}`));
