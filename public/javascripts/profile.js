document.getElementById('upload-profile-picture').addEventListener('click', function (event) {
    document.getElementById('input').click();
});

document.getElementById('remove-profile-picture').addEventListener('click', function (event) {
    fetch('/api/edit-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            picture: "",
            username: document.getElementById('username').innerHTML
        })
    }).then(function (response) {
        if (response.status === 200) {
            window.location.reload();
        } else {
            alert("Error updating profile.");
        }
    });
});

document.getElementById('input').addEventListener('change', function (event) {
    if (this.files.length !== 1) {
        alert('Please select only one file');
        return;
    }

    var file = this.files[0];
    
    // check if file <= 1 MB
    if (file.size > 1048576) {
        alert('File size must be less than 1MB');
        return;
    }

    // check if file is an image
    if (!file.type.match('image.*')) {
        alert('Please select an image');
        return;
    }

	var reader = new FileReader();
	reader.onload = function () {
        fetch('/api/edit-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                picture: reader.result,
                username: document.getElementById('username').innerHTML
            })
        }).then(function (response) {
            if (response.status === 200) {
                window.location.reload();
            } else {
                alert("Error updating profile.");
            }
        });
	}

    reader.readAsDataURL(file);
});