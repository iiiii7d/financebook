var menuExpanded = false;
function toggleMenu(b) {
    if (!b) {
        $("nav")[0].classList.remove("selected");
    } else {
        $("nav")[0].classList.add("selected");
    }
}

$('body')[0].addEventListener('onload', () => {
    loadPage("players")
})

const Pagetitles = {
    'players': 'Players',
    'records': 'Records',
    'notes': 'Notes'
}

function loadPage(page) {
    $("#pagetitle")[0].innerHTML = Pagetitles[page];
    $("main")[0].setAttribute("class", "page-"+page);
    $.get(`pages/${page}.html`, data => {
        $('main').html(data);
    });
}