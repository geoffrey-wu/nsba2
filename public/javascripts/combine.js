window.onload = () => {
    sortTable(28, true);
    sortTable(28, true);
    sortTable(27, true);
    sortTable(27, true);

    for (let i = 0; i < document.getElementsByClassName('rank').length; i++) {
        document.getElementsByClassName('rank')[i].innerHTML = i + 1;
    }
}