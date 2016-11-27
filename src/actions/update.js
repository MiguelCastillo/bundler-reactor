var fs = require("fs-extra");
var path = require("path");
var jsonFormat = require("json-format");

var templateDir = path.join(__dirname, "../../", "template");
var templatePackage = require(path.join(templateDir, "package.json"));

function update(appName) {
  var appDir = path.join(process.cwd(), appName || "");
  var appPackage = require(path.join(appDir, "package.json"));
  var appTasksDir = path.join(appDir, "tasks");

  // ensure app directory exists
  fs.ensureDirSync(appDir);
  fs.ensureDirSync(appTasksDir);

  // copy tasks
  fs.copySync(path.join(templateDir, "tasks"), appTasksDir);

  // Update package.json to have the correct name of the application
  var newAppPackage = Object.assign({}, appPackage, {
    "scripts": Object.assign({}, appPackage.scripts, templatePackage.scripts),
    "devDependencies": Object.assign({}, appPackage.devDependencies, templatePackage.devDependencies),
    "dependencies": Object.assign({}, appPackage.dependencies, templatePackage.dependencies)
  });

  fs.writeFileSync(path.join(appDir, "package.json"), jsonFormat(newAppPackage, { type: "space", size: 2}));
}

module.exports = update;
