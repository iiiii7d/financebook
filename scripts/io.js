// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
  }));
}

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function exportData() {
  var dataStr = "data:text/plain;charset=utf-8," + b64EncodeUnicode(JSON.stringify(getAllData()));
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
    saveAllData(JSON.parse(b64DecodeUnicode(fileContent)));
    loadServerList();
    currentPage = $("main")[0].classList[0].replace(/^page\-/gm, "");
    loadPage(currentPage);
  };
  reader.readAsText(importedFile); 
}   