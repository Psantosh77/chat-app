const socket = io()

let name ;

let textarea = document.querySelector('#textarea')
let  messageArea = document.querySelector('.message_area');

do{
    name  =  prompt("Please enter your name: ")
}while(!name)

textarea.addEventListener("keyup", (e)=>{
    if(e.key === "Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg  = {
        user: name,
        message:message.trim()
    }
    //append
    appendMessage(msg, "outgoing")  
    textarea.value = ""
    scrolltoBottom()

    //send to server via socket 
    socket.emit("message",msg )
}

function appendMessage(msg,type){
    let mainDiv = document.createElement("div")
    let className = type;
    mainDiv.classList.add(className, "message")

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>

    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}

//receive data from socket

socket.on("message", (message)=>{
    appendMessage(message, "incoming")
    scrolltoBottom()
})


function scrolltoBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}
