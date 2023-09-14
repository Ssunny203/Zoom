const socket = io();

const welcomeRoom = document.getElementById("welcomeRoom");
const form = welcomeRoom.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function showRoom(){
    welcomeRoom.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector('h3');
    h3.innerText = `${roomName}`;
    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNicknameSubmit);
}

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function hanelRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit(
        "enter_room", 
        input.value,
        showRoom
    );
    roomName = input.value;
    input.value = "";
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



