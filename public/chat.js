const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

socket.emit('select_room', {
    username,
    room
}, (messages) => {
    messages.forEach(message => createMessage(message));
});

document.querySelector('header > h1').innerHTML = room.charAt(0).toUpperCase() + room.slice(1);;
document.querySelector('div.user > p').innerHTML = username;

function sendMessage() {
    const message = document.getElementById('message_field').value;
    document.getElementById('message_field').value = '';

    const data = {
        room,
        message,
        username
    }

    socket.emit('message', data);
}

document.getElementById('message_field').addEventListener('keypress', () => {
    if (event.key === 'Enter') { sendMessage(); }
});

document.querySelector('i.fa-paper-plane').addEventListener('click', () => {
    sendMessage();
});

socket.on('message', (data) => {
    createMessage(data);
});

function createMessage(data) {
    const article = document.querySelector('article');

    article.innerHTML += `
        <div class="messages ${ data.username === username ? 'you' : 'other' }">
            <img src="https://thispersondoesnotexist.com/image" class="profile-pic"/>

            <div class="message">
                <p>${ data.text }</p>
            </div>
        </div>
    `;
}
document.querySelector('i.fa-sign-out-alt').addEventListener('click', () => {
    window.location.href = 'index.html';
})