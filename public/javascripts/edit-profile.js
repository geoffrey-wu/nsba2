if (sessionStorage.getItem('loggedIn') === 'false') {
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
                    sessionStorage.setItem('loggedIn', 'true');
                    sessionStorage.setItem('username', document.getElementById('username').value);
                    fetch('/api/edit-profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstName: document.getElementById('first-name').value,
                            lastName: document.getElementById('last-name').value,
                            email: document.getElementById('email').value,
                            discord: document.getElementById('discord').value,
                            grade: document.getElementById('grade').value,
                            username: document.getElementById('username').value,
                        })
                    }).then(function (response) {
                        if (response.status === 200) {
                            window.location.href = '/profile/' + document.getElementById('username').value;
                        } else {
                            alert("Error updating profile.");
                        }
                    });
                }

                form.classList.add('was-validated');
            }, false)
        })
})()