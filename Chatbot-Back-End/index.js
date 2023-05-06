const { Socket } = require("dgram");
const express = require("express");
const app = express();

const http = require("http");

const httpServer = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let greeting = [
  "Hello",
  "hello",
  "hy",
  "hyy",
  "good morning",
  "good after noon",
  "good evening",
];


io.on("connection", (socket) => {
  console.log("server is connnect...");
  socket.on("chat", (message) => {
    console.log(message);
    io.emit("chat2", message);
    setTimeout(() => {
      if (greeting.includes(message.msg)) {
        io.emit("chat2", { msg: `hello ${message.name}`, name: "qr-code" });
      } else {
        io.emit("chat2", {
          msg: `Sorry i am not understood your Question please send again your quary if you have other doute so plese click other option`,
          name: "qr-code",
        });
      }
    },2000);
  });
});

httpServer.listen(8080, () => {
  console.log("server is runnig at port 8080 ");
});
