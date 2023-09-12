const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form1");

function hanelRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("room", {payload: input.value});
    input.value = "";
}