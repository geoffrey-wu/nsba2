if (sessionStorage.getItem('loggedIn') === 'false') {
    window.location.href = '/';
}

(function () {
    'use strict'

    document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();

        document.getElementById('submission').innerHTML = "Submitting...";
        fetch('/api/edit-bio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: window.location.pathname.split('/')[2],
                bio: document.getElementById('bio').value,
            })
        }).then(function (response) {
            if (response.status === 200) {
                window.location.href = '/profile/' + window.location.pathname.split('/')[2] + '/';
            } else {
                alert("Error updating bio.");
            }
        });
    });
})()