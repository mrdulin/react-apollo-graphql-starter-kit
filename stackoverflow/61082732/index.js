const fs = require('fs');

export function deleteFile(fileName) {
  fs.unlink(fileName, (err) => {
    if (err) throw err;
    console.log('file was deleted.');
  });
}
