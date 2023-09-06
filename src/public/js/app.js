const frontSocket = new WebSocket(`ws://${window.location.host}`); //socket = 서버로의 연결
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");


function handleOpen() {
    console.log("Connected to Server ✅");
}

function handleMessage(message) {
    console.log("New message :", message.data, " from the server");
}

function handleClose() {
    console.log("Disconnected from Server ⛔");
}

frontSocket.addEventListener("open", handleOpen);

frontSocket.addEventListener("message", handleMessage);

frontSocket.addEventListener("close", handleClose);

setTimeout(() => {
    frontSocket.send("Hi! I'm browser.")
}, 10000);