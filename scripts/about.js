const AboutFunctions = {
    init: (data) => {
      let ele = document.createElement("main");
      ele.innerHTML = data;
      return ele.innerHTML;
    }
};