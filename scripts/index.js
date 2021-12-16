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
    'notes': 'Notes',
    'add': 'Add Bill / Transaction Record',
    'edit': 'Edit Bill / Transaction Record',
    'servers': 'Servers'
};
const PageFunctions = {
    'players': PlayersFunctions,
    'records': RecordsFunctions,
    'notes': NotesFunctions,
    'add': AddFunctions,
    'edit': EditFunctions,
    'servers': ServersFunctions
};

function getData() {
    return JSON.parse(LZString.decompress(localStorage[server]));
}
function saveData(json) {
    localStorage[server] = LZString.compress(JSON.stringify(json));
}

function loadPage(page, func, param) {
    $("#pagetitle")[0].innerHTML = PageTitles[page];
    $("main")[0].setAttribute("class", "page-"+page);
    $("main").html("<b>Loading...</b>");
    $.get(`pages/${page}.html`, data => {
        $('main').html(PageFunctions[page].init(data));
        $('nav')[0].style.height = $('html').height();
        if (func) func(param);
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
        },
        icons: {
            "foobar": "",
            "foobar2": ""
        }
    }));
}

function recalc() {
    let data = getData();
    let players = {};
    Object.values(data.records).forEach(info => {
        if (info.type == "Bill+Transaction") return;
        if (!(info.name in players)) players[info.name] = 0;
        let prevMoney = players[info.name];
        if (info.type == "Transaction") players[info.name] = Math.round((players[info.name] - info.money)*1000)/1000;
        else players[info.name] = Math.round((players[info.name] + info.money)*1000)/1000;
        if (info.type == "Transaction" &&
        ((prevMoney < 0 && players[info.name] > 0) ||
        (prevMoney > 0 && players[info.name] < 0) ||
        prevMoney == 0)) players[info.name] = 0;
        if (players[info.name] == 0) delete players[info.name];
    });
    data.players = players;
    saveData(data);
}
recalc();