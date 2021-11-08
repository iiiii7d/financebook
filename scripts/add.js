const AddFunctions = {
  init: (data) => {
    let ele = document.createElement("main");
    ele.innerHTML = data;
    return ele.innerHTML;
  },
  toggleTypeMode: (mode) => {
    Array.from($("span.type-selector")).forEach(btn => {
      if (btn.innerHTML == mode) btn.classList.add("selected");
      else btn.classList.remove("selected");
    });
  },
  toggleDirMode: (mode) => {
    Array.from($("span.dir-selector")).forEach(btn => {
      if (btn.innerHTML == mode) btn.classList.add("selected");
      else btn.classList.remove("selected");
    });
  },
  addEntry: () => {
    let entry = {
      type: $("span.type-selector.selected")[0].innerHTML == "bill" ? "Bill" : "Transaction",
      name: $("#name")[0].innerHTML,
      money: parseFloat($("#money")[0].innerHTML),
      date: new Date().getTime(),
      description: $("#description")[0].innerHTML,
      img: ""
    };
    if (entry.name.trim() == "") {
      alert("'Player' field is empty");
      return;
    } else if (isNaN(entry.money)) {
      alert("'Money' field is invalid");
      return;
    }
    if ($("span.dir-selector.selected")[0].innerHTML == "player → me") {
      entry.money = -entry.money;
    }

    console.log(entry);

    $.getJSON(`http://api.allorigins.win/get?url=https%3A//api.mojang.com/users/profiles/minecraft/${entry.name}&callback=?`, res => {
	    let uuid = res.contents == "" ? "" : JSON.parse(res.contents).id;
      entry.img = `https://crafatar.com/avatars/${uuid}&overlay`;
      let data = getData();
      data.records[entry.date] = entry;
      saveData(data);
      loadPage("records");
    });
  }
};