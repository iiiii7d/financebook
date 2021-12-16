const ServersFunctions = {
  init: (data) => {
    let ele = document.createElement("main");
    ele.innerHTML = data;
    let template = ele.querySelector("#template");
    Object.keys(getAllData()).forEach(name => {
      let box = document.createElement("div");
      box.innerHTML = template.innerHTML;
      box.classList.add("server-"+name);
      box.querySelector(".name").innerHTML = name;
      box.querySelector(".back").setAttribute("value", getData(name).back);
      box.querySelector(".back").setAttribute("onchange", `ServersFunctions.changeColour("back", "${name}")`);
      box.querySelector(".fore").setAttribute("value", getData(name).fore);
      box.querySelector(".fore").setAttribute("onchange", `ServersFunctions.changeColour("fore", "${name}")`);
      box.querySelector(".fas.fa-times").setAttribute("onclick", `ServersFunctions.deleteServer('${name}')`);
      ele.appendChild(box);
    });
    return ele.innerHTML;
  },
  addServer: () => {
    let name = prompt("Enter the name for the server (Note: this can NOT be changed)");
    if (name.trim() == "") {
      alert("Nice try.");
      return;
    }
    addServerData(name);
    loadPage("servers");
  },
  deleteServer: (name) => {
    if (!confirm(`Are you sure you want to delete ${name}? This cannot be undone!`)) return;
    if (Object.keys(getAllData()).length == 1) {
      alert("This is the only server left, you cant delete it!");
      return;
    }
    removeServerData(name);
    loadPage("servers");
  },
  changeColour: (which, name) => {
    let data = getData(name);
    data[which] = $(`.server-${name} .${which}`)[0].value;
    saveData(data, name);
    loadServerList();
  }
};