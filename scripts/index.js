const DefaultData = {
    players: {},
    records: {},
    notes: {},
    icons: {},
    back: "#cccccc",
    fore: "#000000",
    symbol: "pen"
};

const PageTitles = {
    'players': 'Players',
    'records': 'Records',
    'notes': 'Notes',
    'add': 'Add Bill / Transaction Record',
    'edit': 'Edit Bill / Transaction Record',
    'servers': 'Servers',
    'about': 'About'
};
const PageFunctions = {
    'players': PlayersFunctions,
    'records': RecordsFunctions,
    'notes': NotesFunctions,
    'add': AddFunctions,
    'edit': EditFunctions,
    'servers': ServersFunctions,
    'about': AboutFunctions
};

var menuExpanded = false;
var server = Object.keys(getAllData())[0];
function toggleMenu(b) {
    if (!b) {
        $("nav")[0].classList.remove("selected");
    } else {
        $("nav")[0].classList.add("selected");
    }
}

function getAllData() {
    if (!("financebook" in localStorage)) return {default: DefaultData};
    return JSON.parse(LZString.decompress(localStorage.financebook));
}

function saveAllData(json) {
    if (!("financebook" in localStorage)) localStorage.financebook = LZString.compress("{}");
    localStorage.financebook = LZString.compress(JSON.stringify(json));
}

function getData(requestedServer) {
    if (requestedServer === undefined) requestedServer = server;
    return getAllData()[requestedServer];
}
function saveData(json, requestedServer) {
    if (requestedServer === undefined) requestedServer = server;
    let existingData = getAllData();
    existingData[requestedServer] = json;
    saveAllData(existingData);
}

function addServerData(name) {
    if (!("financebook" in localStorage)) localStorage.financebook = LZString.compress("{}");
    saveData(DefaultData, name);
    loadServerList();
}

function removeServerData(name) {
    let data = getAllData();
    if (name in data) delete data[name];
    if (server == name) server = Object.keys(getAllData())[0];
    saveAllData(data);
    loadServerList();
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

function loadServerList() {
    serverList = $("#serverlist");
    serverList[0].innerHTML = "";
    Object.entries(getAllData()).forEach(([name, info]) => {
        ele = document.createElement("div");
        ele.innerHTML = "<span>"+name.charAt(0).toUpperCase()+"</span>";
        ele.style.color = info.fore;
        ele.style.backgroundColor = info.back;
        ele.setAttribute("onclick", `switchServer("${name}")`);
        if (server == name) ele.style.border = "5px solid #08c";
        
        serverList[0].appendChild(ele);
    });
}

function switchServer(name) {
    server = name;
    loadServerList();
    currentPage = $("main")[0].classList[0].replace(/^page\-/gm, "");
    loadPage(currentPage);
}

if (!("financebook" in Object.keys(localStorage))) addServerData("default");
else recalc();
loadServerList();


if (true) // debug
    saveData({
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
        },
        back: "#cccccc",
        fore: "#000000"
    }, "default");