const frontSocket = new WebSocket(`ws://${window.location.host}`); //socket = 서버로의 연결
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

function handleOpen() {
    console.log("Connected to Server ✅");
}

function handleMessage(message) {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
}

function handleClose() {
    console.log("Disconnected from Server ⛔");
}

function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg); //JSON.stringify() : JavaScript object를 string으로 바꿔줌
}

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    frontSocket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    frontSocket.send(makeMessage("nickname", input.value));
}

frontSocket.addEventListener("open", handleOpen);
frontSocket.addEventListener("message", handleMessage);
frontSocket.addEventListener("close", handleClose);

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
