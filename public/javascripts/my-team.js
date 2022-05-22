function createTeam() {
    fetch('/api/create-team', {
        method: 'POST'
    });
}

function changeTeamName() {
    fetch('/api/edit-team-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newName: document.getElementById('new-team-name').value
        })
    }).then(() => {
        window.location.href = '';
    });
}