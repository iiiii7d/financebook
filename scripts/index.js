var menuExpanded = false;
var server = "server";
function toggleMenu(b) {
    if (!b) {
        $("nav")[0].classList.remove("selected");
    } else {
        $("nav")[0].classList.add("selected");
    }
}

const PageTitles = {
    'players': 'Players',
    'records': 'Records',
    'notes': 'Notes'
};
const PageFunctions = {
    'players': PlayersFunctions,
    'records': RecordsFunctions,
    'notes': NotesFunctions
};

function getData() {
    return JSON.parse(LZString.decompress(localStorage[server]));
}
function saveData(json) {
    localStorage[server] = LZString.compress(JSON.stringify(json));
}

function loadPage(page) {
    $("#pagetitle")[0].innerHTML = PageTitles[page];
    $("main")[0].setAttribute("class", "page-"+page);
    $("main").html("<b>Loading...</b>");
    $.get(`pages/${page}.html`, data => {
        $('main').html(PageFunctions[page].init(data));
        $('nav')[0].style.height = $('html').height();
    });
}

if (true) {
    localStorage[server] = LZString.compress(JSON.stringify({
        players: {
            "foobar": 100,
            "foobar2": -100
        },
        records: {
            "a": {
                type: "Bill",
                name: "foobar",
                money: 100,
                date: new Date().getTime(),
                description: "abc"
            },
            "b": {
                type: "Transaction",
                name: "foobar2",
                money: -100,
                date: new Date().getTime(),
                description: "xyz"
            }
        },
        notes: {
            "a": {
                createddate: new Date().getTime(),
                modifieddate: new Date().getTime(),
                title: "title",
                content: "lorem ipsum dolor"
            }
        }
    }));
}