function logout() {
    fetch('/api/logout', {
        method: 'POST',
    }).then((response) => {
        window.location.href = '/';
    });
}