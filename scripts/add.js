const AddFunctions = {
  init: (data) => {
    return data
  },
  toggleMode: (mode) => {
    document.querySelectorAll("span.type-selector").forEach(btn => {
      if (btn.innerHTML == mode) btn.classList.add("selected");
      else btn.classList.remove("selected");
    })
  }
};