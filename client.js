const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you:${message}`,'rightm');
    socket.emit('send',message);
    messageInput.value=''
})

const socket = io('http://localhost:3000');
const names=prompt('Enter your name ');
socket.emit('new-user-joined', names);
socket.on('user-joined',name=>{
    append(`${name} join the chat`,'rightm')
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'leftm')
})
socket.on('left',name=>{
    append(`${name} left the chat`,'leftm')
})