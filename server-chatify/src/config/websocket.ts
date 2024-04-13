import { Server } from "socket.io";
import http from "http";
import { Express } from "express";

export function connectWebSocket(app: Express) {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}
