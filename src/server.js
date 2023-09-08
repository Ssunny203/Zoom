import express from "express";
import http from "http";
// import WebSocketServer from "ws";
import {Server} from "socket.io";


const app = express(); //서버 셋팅
const httpServer = http.createServer(app);
const IOServer = new Server(httpServer);

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // __dirname을 호출하면 같은 디렉토리 경로가 반환됨
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

// websockets으로 연결 시 셋팅
// const server = http.createServer(app);
// const wss = new WebSocketServer.Server({ server }); //http 서버 위에 webSocket 서버를 만듦

function onSocketClose() {
    console.log("Disconnected from the Browser ⛔");
}
// Websocket으로 채팅 구축
// const sockets = [];

// wss.on("connection", (backSocket) => { //socket = 연결된 브라우저
//     sockets.push(backSocket);
//     backSocket["nickname"] = "anon";
//     console.log("Connected to Browser ✅");
//     backSocket.send("hello!");
//     backSocket.on("message", (msg) => {
//         const message = JSON.parse(msg); // JSON.parse()는 string을 JavaScript object로 바꿔줌
//         console.log(message.toString());
        
//         // if(message.type === "new_message"){
//         //     sockets.forEach((aSocket) => aSocket.send((message.payload).toString()));
//         // }
//         // else if(message.type === "nickname"){
//         //     console.log((message.payload).toString());
//         // }
        
//         switch(message.type){
//             case "new_message":
//                 sockets.forEach((aSocket) => aSocket.send(`${backSocket.nickname}: ${(message.payload).toString()} `));
//             case "nickname":
//                 backSocket["nickname"] = (message.payload).toString();
//         }

//     });
//     backSocket.on("close", onSocketClose);
// });


IOServer.listen(3000, handleListen);
