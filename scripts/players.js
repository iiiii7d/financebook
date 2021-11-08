const PlayersFunctions = {
  init: (data) => {
    let ele = document.createElement("main");
    ele.innerHTML = data;
    let template = ele.querySelector("#template");
    Object.entries(getData().players).forEach(([player, amt]) => {
      let box = document.createElement("div");
      box.innerHTML = template.innerHTML;
      box.querySelector(".name").innerHTML = player;
      box.querySelector(".money").innerHTML = Math.abs(amt);
      box.querySelector(".dir").innerHTML = "owed by "+(amt<0 ? "them" : "me");
      ele.appendChild(box);
    });
    
    return ele.innerHTML;
  }
};