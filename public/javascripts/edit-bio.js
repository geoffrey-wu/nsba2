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
                bio: {
                    generalBio: document.getElementById('general').value,
                    experience: document.getElementById('experience').value,
                    competitions: document.getElementById('competitions').value,
                    textbooks: document.getElementById('textbooks').value,
                }
            })
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = '/profile';
            } else {
                alert("Error updating bio.");
            }
        });
    });
})()