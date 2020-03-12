module.exports = function(property) {
  var data = decodeEntities(property);
};

function decodeEntities(encodedString) {
  let textArea = document.createElement('textarea');
  textArea.innerHTML = encodedString;
  return textArea.value;
}
