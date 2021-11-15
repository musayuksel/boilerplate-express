const { request } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Hello Express
// app.get("/", (request, response) => {
//   response.send("Hello Express");
// });
// Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  const string =
    req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});
// Chain Middleware to Create a Time Server
app.get(
  "/now",
  (request, response, next) => {
    request.time = new Date().toString();
    next();
  },
  (request, response) => {
    response.send({ time: request.time });
  }
);
// Serve Static Assets
const absolutePath = __dirname + "/public";
app.use("/public", express.static(absolutePath));
// Send File
app.get("/", (request, response) => {
  const absolutePath = __dirname + "/views/index.html";
  response.sendFile(absolutePath, (err) => {
    console.log("Error handler, >" + absolutePath);
  });
});
// Serve JSON on a Specific Route && Use the .env FilePassed
app.get("/json", (req, res) => {
  let message = "Hello json";
  process.env.MESSAGE_STYLE == "uppercase"
    ? (message = message.toUpperCase())
    : (message = message);
  res.json({ message: message });
});
// Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
  const firstname = req.query.first;
  const lastname = req.query.last;
  res.send({ name: `${firstname} ${lastname}` });
});
// Get Route Parameter Input from the Client
app.get("/:word/echo", (request, response) => {
  const word = request.params.word;
  response.send({ echo: word });
});
module.exports = app;
