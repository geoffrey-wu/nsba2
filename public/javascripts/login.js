// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    var form = document.getElementById('login');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity())
            event.stopPropagation();

        form.classList.add('was-validated');

        document.getElementById('submission').innerHTML = "Logging in...";

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        }).then(function (response) {
            if (response.status === 200) {
                window.location.href = '/profile';
            } else {
                document.getElementById('submission').innerHTML = "Login";
                alert("Invalid username or password.");
            }
        });
    }, false);
})()