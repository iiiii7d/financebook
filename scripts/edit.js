const EditFunctions = {
  init: (data) => {
    let ele = document.createElement("main");
    ele.innerHTML = data;
    return ele.innerHTML;
  },
  fillData: (id) => {
    let info = getData().records[id];
    $("#id")[0].innerHTML = id;
    $("#date")[0].innerHTML = info.date;
    $("#type")[0].innerHTML = info.type == 'Bill' ? "bill" : "transaction";
    $("#name")[0].innerHTML = info.name;
    $("#description")[0].innerHTML = info.description;
    $("#money")[0].innerHTML = Math.abs(info.money);
    if (info.money < 0) {
      $(".dir-selector")[0].classList.remove("selected");
      $(".dir-selector")[1].classList.add("selected");
    }
  },
  toggleDirMode: (mode) => {
    Array.from($("span.dir-selector")).forEach(btn => {
      if (btn.innerHTML == mode) btn.classList.add("selected");
      else btn.classList.remove("selected");
    });
  },
  addEntry: () => {
    let entry = {
      type: $("#type")[0].innerHTML == "bill" ? "Bill" : "Transaction",
      name: $("#name")[0].innerHTML,
      money: parseFloat($("#money")[0].innerHTML),
      date: parseInt($("#date")[0].innerHTML),
      description: $("#description")[0].innerHTML
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
      let data = getData();
      data.icons[entry.name] = `https://crafatar.com/avatars/${uuid}?overlay`;
      data.records[entry.date] = entry;
      if ($("span.type-selector.selected")[0].innerHTML == "bill+transaction") {
        entry.type == "Bill"
        entry.date = new Date().getTime();
        data.records[entry.date] = entry;
      }
      saveData(data);
      recalc();
      loadPage("records");
    });
  }
};