const RecordsFunctions = {
  init: (data) => {
    let ele = document.createElement("main");
    ele.innerHTML = data;
    let template = ele.querySelector("#template");
    Object.entries(getData().records).forEach(([index, info]) => {
      let box = document.createElement("div");
      box.innerHTML = template.innerHTML;
      box.querySelector(".type").innerHTML = info.type;
      box.querySelector(".from").innerHTML = info.money<0 ? info.name : "me";
      box.querySelector(".to").innerHTML = info.money<0 ? "me" : info.name;
      box.querySelector(".money").innerHTML = Math.abs(info.money);
      box.querySelector(".description").innerHTML = info.description;
      box.querySelector(".date").innerHTML = new Date(info.date).toLocaleString();
      box.querySelector(".fas.fa-times").setAttribute("onclick", `RecordsFunctions.deleteRecord('${index}')`);
      ele.appendChild(box);
    });
    return ele.innerHTML;
  },
  deleteRecord: (index) => {
    let info = getData().records[index];
    if (!confirm("Are you sure you want to delete this record:\n" +
    `Type: ${info.type}\n` +
    `From: ${info.money<0 ? info.name : "me"}\n` +
    `To: ${info.money<0 ? "me" : info.name}\n` +
    `Money: ${Math.abs(info.money)}\n` +
    `Description: ${info.description}\n` +
    `Date: ${new Date(info.date).toLocaleString()}`)) return;
    let newLS = getData();
    delete newLS.records[index];
    saveData(newLS);
    loadPage("records");
  },
  editRecord: (index) => {
    loadPage("edit", EditFunctions.fillData, index);
  }
};