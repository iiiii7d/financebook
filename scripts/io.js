function exportData() {
  //var dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(localStorage.financebook, "UTF-8");
  var dataStr = new Blob([localStorage.financebook], {
    type: 'text/plain;charset=utf-8', 
    encoding: "utf-8"
  });
  var dlAnchorElem = $('#downloader')[0];
  dlAnchorElem.href = dataStr;
  dlAnchorElem.download = "data.fnb";
  dlAnchorElem.click();
}

function importData() {
  var importedFile = $('#importer')[0].files[0];

  var reader = new FileReader();
  reader.onload = function() {
    if (!confirm("This will overwrite your present stored data entirely; you may want to back the current save first.")) return;
    var fileContent = reader.result;
    document.getElementById('importer').value = "";
    console.log(fileContent);
    localStorage.financebook = fileContent;
    loadServerList();
    currentPage = $("main")[0].classList[0].replace(/^page\-/gm, "");
    loadPage(currentPage);
  };
  reader.readAsText(importedFile); 
}   