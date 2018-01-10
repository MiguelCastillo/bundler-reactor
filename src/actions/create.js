var fs = require("fs-extra");
var path = require("path");
var jsonFormat = require("json-format");
var installDB = require("../installDB");

var templateDir = path.join(__dirname, "../../", "template/base");
var templatePackage = require(path.join(templateDir, "package.json"));


function create(appName) {
  if (!appName) {
    throw new TypeError("Must provide a valid application name");
  }

  var appDir = path.join(process.cwd(), appName);
  var appConfigDir = path.join(appDir, ".bundler");
  var appInstallDB = installDB(templateDir);

  // ensure app directory exists
  fs.ensureDirSync(appDir);
  fs.ensureDirSync(appConfigDir);

  appInstallDB.files.forEach(function(file) {
    fs.copySync(path.join(templateDir, file.src), path.join(appDir, file.dest));
  });

  // Update package.json to have the correct name of the application
  var newTemplatePackage = Object.assign({}, templatePackage, { name: appName });
  fs.writeFileSync(path.join(appDir, "package.json"), jsonFormat(newTemplatePackage, { type: "space", size: 2 }));

  // Write install db.
  fs.writeFileSync(path.join(appDir, ".bundler/.install"), JSON.stringify(appInstallDB));
}


module.exports = create;
