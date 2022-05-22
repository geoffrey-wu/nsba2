document.getElementById('createTeam').addEventListener('click', () => {
    fetch('/api/create-team', {
        method: 'POST'
    });
});