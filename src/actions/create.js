var fs = require("fs-extra");
var path = require("path");
var jsonFormat = require("json-format");

var templateDir = path.join(__dirname, "../../", "template");
var templatePackage = require(path.join(templateDir, "package.json"));

function create(appName) {
  if (!appName) {
    throw new TypeError("Must provide a valid application name");
  }

  var appDir = path.join(process.cwd(), appName);

  // ensure app directory exists
  fs.ensureDirSync(appDir);

  // Copy template directory
  fs.copySync(templateDir, appDir);

  // Rename gitignore to .gitignore
  fs.move(path.join(appDir, "gitignore"), path.join(appDir, ".gitignore"), []);

  // Update package.json to have the correct name of the application
  var newTemplatePackage = Object.assign({}, templatePackage, {
    name: appName
  });

  fs.writeFileSync(path.join(appDir, "package.json"), jsonFormat(newTemplatePackage, { type: "space", size: 2}));
}

module.exports = create;
