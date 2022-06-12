/**
 * Time remaining for the current GM to select their next draft pick, in seconds.
 * @type {Number}
 */
var draft_time;
const seconds_per_pick = 180;

/**
 * Enable tooltips on this page.
 */
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// const socket = io('http://localhost:6700');
const socket = io('https://nsba.herokuapp.com:6700');

socket.on('new pick', (data) => {
    resetTimer();

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

// function autoDraft() {
//     let worstPick = -1;
//     let worstButton;
//     for (let element of document.getElementsByTagName('tr')) {
//         if (parseInt(element.children[6].innerHTML) > worstPick) {
//             worstPick = element.children[6].innerHTML;
//             worstButton = element.children[1].children[0];
//         }
//     }

//     worstButton.click();
// }

window.draftPlayer = draftPlayer;

/**
 * Implement drag-to-scroll for the draft order:
 */
let draftOrder = document.getElementById('draft-order');
let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function (e) {
    draftOrder.style.cursor = 'grabbing';
    draftOrder.style.userSelect = 'none';

    pos = {
        // The current scroll
        left: draftOrder.scrollLeft,
        top: draftOrder.scrollTop,
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
    draftOrder.scrollTop = pos.top - dy;
    draftOrder.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    draftOrder.style.cursor = 'grab';
    draftOrder.style.removeProperty('user-select');
};

draftOrder.addEventListener('mousedown', mouseDownHandler);

/**
 * Implement timer for the draft:
 */

// function timer() {
//     var timer = setInterval(() => {
//         document.getElementById('current-minute').innerHTML = Math.floor(draft_time / 60);
//         let seconds = draft_time % 60;
//         seconds = seconds.toString();
//         if (seconds.length == 1) {
//             seconds = '0' + seconds;
//         }
//         document.getElementById('current-second').innerHTML = seconds;
//         draft_time--;
//         if (draft_time < 0) {
//             // resetTimer();
//             autoDraft();
//             clearInterval(timer);
//         }
//     }, 1000);
// }

// function resetTimer(seconds=seconds_per_pick) {
//     draft_time = seconds;
// }

window.onload = () => {
    sortTable(5, true);
    sortTable(5, true);
    sortTable(4, true);
    sortTable(4, true);

    for (let i = 0; i < document.getElementsByClassName('projected').length; i++) {
        document.getElementsByClassName('projected')[i].innerHTML = i + 1;
    }

    // resetTimer();
    /**
     * 6/11/2022 @ 8 PM CDT, the start time of the draft
     */
    //  const startTime = 1654997400000;
    //  if ((new Date()).getTime() < startTime) {
    //     setTimeout(timer, startTime - (new Date()).getTime());
    // } else {
    //     timer();
    // }
};