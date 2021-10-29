var menuExpanded = false;
function toggleMenu(b) {
    if (!b) {
        document.getElementsByTagName("nav")[0].classList.remove("selected");
    } else {
        document.getElementsByTagName("nav")[0].classList.add("selected");
    }
}