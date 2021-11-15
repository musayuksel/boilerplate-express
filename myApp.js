const express = require("express");
const app = express();
// Hello Express
// app.get("/", (request, response) => {
//   response.send("Hello Express");
// });

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
// Serve JSON on a Specific Route
app.get("/json", (request, response) => {
  response.json({ message: "Hello json" });
});

module.exports = app;
