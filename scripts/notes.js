const NotesFunctions = {
  init: (data) => {
    let ele = document.createElement("main");
    ele.innerHTML = data;
    let template = ele.querySelector("#template");
    Object.entries(getData().notes).forEach(([index, info]) => {
      let box = document.createElement("div");
      box.innerHTML = template.innerHTML;
      box.querySelector(".createddate").innerHTML = new Date(info.createddate).toLocaleString();
      box.querySelector(".modifieddate").innerHTML = new Date(info.modifieddate).toLocaleString();
      box.querySelector(".title").innerHTML = info.title;
      box.querySelector(".content").innerHTML = info.content;
      box.querySelector(".fas.fa-times").setAttribute("onclick", `NotesFunctions.deleteNote('${index}')`);
      ele.appendChild(box);
    });
    return ele.innerHTML;
  },
  deleteNote: (index) => {
    let info = getData().notes[index];
    if (!confirm("Are you sure you want to delete this note:\n" +
    `Title: ${info.title}\n` +
    `Created: ${new Date(info.createddate).toLocaleString()}\n` +
    `Modified: ${new Date(info.modifieddate).toLocaleString()}\n`)) return;
    let newLS = getData();
    delete newLS.notes[index];
    saveData(newLS);
    loadPage("notes");
  }
};