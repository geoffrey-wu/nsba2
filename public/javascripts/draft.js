
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// const socket = io('http://localhost:6700');
const socket = io('https://nsba.herokuapp.com:6700');

socket.on('new pick', (data) => {
    // move the current pick to the previous pick
    document.getElementById('previous-number').innerHTML = parseInt(document.getElementById('previous-number').innerHTML) + 1;
    document.getElementById('previous-gm').innerHTML = document.getElementById('current-gm').innerHTML;
    document.getElementById('previous-team').innerHTML = document.getElementById('current-team').innerHTML;
    document.getElementById('previous-player').innerHTML = data.player;

    // move the next pick to the current pick
    document.getElementById('current-number').innerHTML = parseInt(document.getElementById('current-number').innerHTML) + 1;
    document.getElementById('current-gm').innerHTML = document.getElementById('next-gm').innerHTML;
    document.getElementById('current-team').innerHTML = document.getElementById('next-team').innerHTML;

    // update next pick
    document.getElementById('next-number').innerHTML = parseInt(document.getElementById('next-number').innerHTML) + 1;
    document.getElementById('next-gm').innerHTML = data.nextGm;
    document.getElementById('next-team').innerHTML = data.nextTeam;

    document.querySelector(`[player=${data.player}]`).remove();

    let username = document.querySelector('a.nav-link[href="/profile"]').innerHTML;
    if (username === document.getElementById('current-gm').innerHTML) {
        let buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }
    }
});

async function draftPlayer(username) {
    try {
        await fetch('/api/draft-player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player: username
            })
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        }
        ).then(data => {
            let buttons = document.getElementsByTagName('button');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
            socket.emit('new pick', data);
        });
    } catch (error) {
        console.log(error);
    }
}

window.draftPlayer = draftPlayer;

let ele = document.getElementById('draft-order');
let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function (e) {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';

    pos = {
        // The current scroll
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
};

ele.addEventListener('mousedown', mouseDownHandler);