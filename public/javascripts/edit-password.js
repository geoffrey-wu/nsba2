(function () {
    'use strict'
    let form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else if (document.getElementById('new-password').value !== document.getElementById('confirm-password').value) {
            event.preventDefault();
            event.stopPropagation();
            document.getElementById('new-password').value = "";
            document.getElementById('confirm-password').value = "";
        } else {
            document.getElementById('submission').innerHTML = "Submitting...";
            fetch('/api/edit-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldPassword: document.getElementById('old-password').value,
                    newPassword: document.getElementById('new-password').value,
                })
            }).then((response) => {
                if (response.status === 200) {
                    window.location.href = '/profile/';
                } else {
                    alert("Error updating password.");
                }
            });
        }

        form.classList.add('was-validated');
    });
})()