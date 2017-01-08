var fracker = require("./fracker");
var fs = require("fs-extra");
var path = require("path");
var gitignoreParser = require("gitignore-parser");

gitignore = gitignoreParser.compile(fs.readFileSync(path.join(__dirname, "../template/base/gitignore"), "utf8"));

var fileMap = {
  "gitignore": ".gitignore",
  "npmignore": ".npmignore"
};

function createInstallDB(dir) {
  var files = fracker
    .init(dir)
    .filter(function(file) {
      return gitignore.accepts(file.src);
    })
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
