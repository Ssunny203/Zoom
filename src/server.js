import express from "express";
import http from "http";
import WebSocketServer from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // __dirname을 호출하면 같은 디렉토리 경로가 반환됨
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

const server = http.createServer(app);
const wss = new WebSocketServer.Server({ server }); //http 서버 위에 webSocket 서버를 만듦

function onSocketClose() {
    console.log("Disconnected from the Browser ⛔");
}

const sockets = [];

wss.on("connection", (backSocket) => { //socket = 연결된 브라우저
    sockets.push(backSocket);
    console.log("Connected to Browser ✅");
    backSocket.send("hello");
    backSocket.on("message", (message) => {
        sockets.forEach((aSocket) => aSocket.send(message.toString()));
        //console.log(message.toString());
    });
    backSocket.on("close", onSocketClose);
});

server.listen(3000, handleListen);
