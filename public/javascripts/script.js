var username = localStorage.getItem('username');
var loggedIn = localStorage.getItem('loggedIn');

if (loggedIn === 'true') {
    let a = document.createElement('a');
    a.className = 'nav-link active';
    a.innerText = username;
    a.href = `/profile?username=${username}`;
    
    let navLogin = document.getElementById('nav-login');
    navLogin.innerHTML = "";
    navLogin.appendChild(a);

    let navMainContent = document.getElementById('nav-main-content');
    a = document.createElement('a');
    a.className = 'nav-link';
    a.innerText = 'My Team';
    a.href = `/my-team.html`;
    let li = document.createElement('li');
    li.className = 'nav-item';
    li.appendChild(a);
    navMainContent.appendChild(li);

    navMainContent = document.getElementById('nav-main-content');
    a = document.createElement('a');
    a.className = 'nav-link';
    a.innerText = 'Players';
    a.href = `/players.html`;
    li = document.createElement('li');
    li.className = 'nav-item';
    li.appendChild(a);
    navMainContent.appendChild(li); 
}