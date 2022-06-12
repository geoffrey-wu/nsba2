/**
 * Enable tooltips on this page.
 */
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

window.onload = () => {
    sortTable(0, true);

    for (let i = 0; i < document.getElementsByClassName('projected').length; i++) {
        document.getElementsByClassName('projected')[i].innerHTML = i + 1;
    }
};