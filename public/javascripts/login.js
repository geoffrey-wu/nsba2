if (sessionStorage.getItem('loggedIn') === 'true') {
    window.location.href = '/';
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')

                document.getElementById('submission').innerHTML = "Logging in...";

                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('username', document.getElementById('username').value);

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
                        window.location.href = '/';
                    } else {
                        document.getElementById('submission').innerHTML = "Login";
                        sessionStorage.setItem('loggedIn', 'false');
                        sessionStorage.removeItem('username');
                        alert("Invalid username or password.");
                    }
                });
            }, false);
        })
})()