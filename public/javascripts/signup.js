if (localStorage.getItem('loggedIn') === 'true') {
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
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    document.getElementById('submission').innerHTML = "Submitting...";
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('username', document.getElementById('username').value);
                    fetch('/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstName: document.getElementById('first-name').value,
                            lastName: document.getElementById('last-name').value,
                            email: document.getElementById('email').value,
                            discord: document.getElementById('discord').value,
                            username: document.getElementById('username').value,
                            password: document.getElementById('password').value
                        })
                    }).then(function (response) {
                        if (response.status === 200) {
                            window.location.href = '/';
                        } else {
                            document.getElementById('submission').innerHTML = "Submit";
                            localStorage.setItem('loggedIn', 'false');
                            localStorage.removeItem('username');
                            alert("Username already exists.");
                        }
                    });
                }

                form.classList.add('was-validated');
            }, false)
        })
})()