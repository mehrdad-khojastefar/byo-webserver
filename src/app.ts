import * as net from "net";

let server = net.createServer();
server.on("connection", newConnection);
server.on("error", (err: Error) => {
  throw err;
});
server.listen({ hostname: "127.0.0.1", port: 8080 });

function newConnection(socket: net.Socket): void {
  console.log("New connection: %s,%s", socket.remoteAddress, socket.remotePort);
  socket.on("end", () => {
    // FIN recieved.
    console.log("EOF.");
  });
  socket.on("data", (data: Buffer) => {
    console.log("data %s", data);
    socket.write(data);
    if (data.includes("q")) {
      console.log("closing...");
      socket.end();
    }
  });
}
