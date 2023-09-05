import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // __dirname을 호출하면 같은 디렉토리 경로가 반환됨
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log('Listening on http://localhost:3000');
app.listen(3000, handleListen);