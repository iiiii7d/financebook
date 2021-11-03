const NotesFunctions = {
  init: (data) => {
    let ele = document.createElement("main");
    ele.innerHTML = data;
    let template = ele.querySelector("#template");
    Object.entries(getData().notes).forEach(([index, info]) => {
      let box = document.createElement("div");
      box.innerHTML = template.innerHTML;
      box.querySelector(".createddate").innerHTML = info.createddate.toLocaleString();
      box.querySelector(".modifieddate").innerHTML = info.modifieddate.toLocaleString();
      box.querySelector(".title").innerHTML = info.title;
      box.querySelector(".content").innerHTML = info.content;
      ele.appendChild(box);
    });
    return ele.innerHTML;
  }
}