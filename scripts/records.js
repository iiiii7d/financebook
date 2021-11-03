const RecordsFunctions = {
  init: (data) => {
    let ele = document.createElement("main");
    ele.innerHTML = data;
    let template = ele.querySelector("#template");
    getData().records.forEach(info => {
      let box = document.createElement("div");
      box.innerHTML = template.innerHTML;
      box.querySelector(".type").innerHTML = info.type
      box.querySelector(".from").innerHTML = info.money<0 ? info.name : "me";
      box.querySelector(".to").innerHTML = info.money<0 ? "me" : info.name;
      box.querySelector(".money").innerHTML = Math.abs(info.money);
      box.querySelector(".description").innerHTML = info.description;
      box.querySelector(".date").innerHTML = info.date.toLocaleString();
      ele.appendChild(box);
    });
    return ele.innerHTML;
  }
}