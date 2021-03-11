const fs = require('fs');
const request = require('request');
request(process.argv[2], (error, response, body) => {
  if (error)
    console.log('error:', error); // Print the error if one occurred
  write(body);
});

const write = function(data) {
  const path = process.argv[3];
  try {
    if (fs.existsSync(path)) {
      fs.appendFile(path, data, function(err) {
        if (err) throw err;
        console.log('Updated!');
      });
    } else {
      fs.writeFile(path, data, function(err) {
        if (err) throw err;
        let fileSize = getFilesizeInBytes(path);
        console.log(`Downloaded and saved ${fileSize} bytes to ./index.html`);
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const getFilesizeInBytes = function (filename) {
  let stats = fs.statSync(filename);
  let fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};
