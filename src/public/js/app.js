const socket = io();

const welcomeRoom = document.getElementById("welcomeRoom"); // 입장방
const form = welcomeRoom.querySelector("form"); // 입장할 방 이름 묻기
const room = document.getElementById("room"); // 방 입장

room.hidden = true;

let roomName;
let nickName;

function showRoom(nameInput){
    welcomeRoom.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector('h3');
    h3.innerText = `${roomName}` + `${nickName}`;
    const msgForm = room.querySelector("#msg");
    msgForm.addEventListener("submit", handleMessageSubmit);
    // nameForm.addEventListener("submit", handleNicknameSubmit);
}

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function hanelRoomSubmit(event){
    event.preventDefault();
    const nameInput = form.querySelector("#getName");
    const roomInput = form.querySelector("#getRoom");
    socket.emit(
        "enter_room", 
        roomInput.value,
        showRoom(nameInput.value)
    );
    roomName = roomInput.value;
    nickName = nameInput.value;
    roomInput.value = "";
}

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#name input");

    socket.emit("nickname", input.value);

}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;

    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`Me : ${value}`);
    });
    input.value = "";
}

form.addEventListener("submit", hanelRoomSubmit);

socket.on("welcomeRoom", (user) => {
    addMessage(`${user} joined!`);
});

socket.on("bye", (user) => {
    addMessage(`${user} left..`);
})

socket.on("new_message", addMessage);



