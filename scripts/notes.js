const NotesFunctions = {
  init: (data) => {
    let ele = document.createElement("main");
    ele.innerHTML = data;
    let template = ele.querySelector("#template");
    Object.entries(getData().notes).forEach(([index, info]) => {
      let box = document.createElement("div");
      box.innerHTML = template.innerHTML;
      box.classList.add("note-"+index)
      box.querySelector(".createddate").innerHTML = new Date(info.createddate).toLocaleString();
      box.querySelector(".modifieddate").innerHTML = new Date(info.modifieddate).toLocaleString();
      box.querySelector(".title").innerHTML = info.title;
      box.querySelector(".content").innerHTML = info.content;
      box.querySelector(".fas.fa-times").setAttribute("onclick", `NotesFunctions.deleteNote('${index}')`);
      box.querySelector(".fas.fa-pen").setAttribute("onclick", `NotesFunctions.openEditing('${index}')`);
      box.querySelector(".save").setAttribute("onclick", `NotesFunctions.saveNote('${index}', \
                                                          $(".note-${index} .title")[0].innerHTML, \
                                                          $(".note-${index} .content")[0].innerHTML)`);
      ele.appendChild(box);
    });
    return ele.innerHTML;
  },
  addNote: () => {
    let box = document.createElement("div");
    box.innerHTML = $("#template")[0].innerHTML;
    let index = new Date().getTime();
    box.classList.add("note-"+index);
    box.querySelector(".createddate").innerHTML = new Date().toLocaleString();
    box.querySelector(".modifieddate").innerHTML = new Date().toLocaleString();
    box.querySelector(".fas.fa-times").setAttribute("onclick", `NotesFunctions.deleteNote('${index}')`);
    box.querySelector(".fas.fa-pen").setAttribute("onclick", `NotesFunctions.openEditing('${index}')`);
    box.querySelector(".save").setAttribute("onclick", `NotesFunctions.saveNote('${index}', \
                                                        $(".note-${index} .title")[0].innerHTML, \
                                                        $(".note-${index} .content")[0].innerHTML)`);
    $("main")[0].appendChild(box);
    NotesFunctions.openEditing(index);
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
  },
  openEditing: (index) => {
    $(`.note-${index} .title`)[0].setAttribute("contenteditable", true);
    $(`.note-${index} .content`)[0].setAttribute("contenteditable", true);
    //Array.from($(`.note-${index} .ce`)).forEach(ele => ele.hidden = false);
    $(`.note-${index} .save`)[0].hidden = false;
    $(`.note-${index} .editdisplay`)[0].hidden = false;
  },
  closeEditing: (index) => {
    $(`.note-${index} .title`)[0].removeAttribute("contenteditable");
    $(`.note-${index} .content`)[0].removeAttribute("contenteditable");
    //Array.from($(`.note-${index} .ce`)).forEach(ele => ele.hidden = true);
    $(`.note-${index} .save`)[0].hidden = true;
    $(`.note-${index} .editdisplay`)[0].hidden = true;
  },
  saveNote: (index, title, content) => {
    let data = getData();
    data.notes[index] = {
      createddate: data.notes[index] !== undefined ? data.notes[index].createddate : new Date().getTime(),
      modifieddate: new Date().getTime(),
      title: title,
      content: content
    };
    saveData(data);
    $(`.note-${index} .modifieddate`)[0].innerHTML = new Date(data.notes[index].modifieddate).toLocaleString();
    NotesFunctions.closeEditing(index);
  }
};