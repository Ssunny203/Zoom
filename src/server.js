import express from "express";
import http from "http";
// import WebSocketServer from "ws";
import {Server} from "socket.io";

const app = express(); //서버 셋팅
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // __dirname을 호출하면 같은 디렉토리 경로가 반환됨
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

// websockets으로 연결 시 셋팅
// const server = http.createServer(app);
// const wss = new WebSocketServer.Server({ server }); //http 서버 위에 webSocket 서버를 만듦


// Websocket으로 채팅 구축
// const sockets = [];
// function onSocketClose() {
//     console.log("Disconnected from the Browser ⛔");
// }
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

io.on("connection", (socket) => {
    // console.log(socket);
    // socket["nickname"] = "Anon";
    socket.onAny((event) => {
        console.log(`Socket Event : ${event}`);
    });
    socket.on("enter_room", (roomName, nickName, done) => {
        socket.join(roomName);
        socket["nickname"] = `${nickName}`;
        done();
        socket.to(roomName).emit("welcomeRoom", socket.nickname);
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname));
    });
    socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
        done();
    });
});

httpServer.listen(3000, handleListen);
