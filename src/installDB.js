var fracker = require("./fracker");

var fileMap = {
  "gitignore": ".gitignore"
};

function createInstallDB(dir) {
  var files = fracker
    .init(dir)
    .filter(function(file) {
      return file.src !== "package.json";
    })
    .map(function(file) {
      return Object.assign(file, {
        dest: fileMap[file.dest] || file.dest
      });
    });

  return {
    files: files
  };
}

module.exports = createInstallDB;
