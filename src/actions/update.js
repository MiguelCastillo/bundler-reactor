var fs = require("fs-extra");
var path = require("path");
var jsonFormat = require("json-format");
var fracker = require("../fracker");
var installDB = require("../installDB");

var templateDir = path.join(__dirname, "../../", "template");
var templatePackage = require(path.join(templateDir, "package.json"));

function update(appName) {
  var appDir = path.join(process.cwd(), appName || "");
  var appPackagePath = path.join(appDir, "package.json");
  var appPackage = require(appPackagePath);
  var appTasksDir = path.join(appDir, ".tasks");
  var templateInstalDB = installDB(templateDir);
  var appInstallDB;

  try {
    appInstallDB = fs.readJsonSync(path.join(appDir, ".install.db"));
  }
  catch(ex) {
    // try to initialize a DB file from the template
    appInstallDB = templateInstalDB;
  }

  // ensure app directory exists
  fs.ensureDirSync(appDir);
  fs.ensureDirSync(appTasksDir);

  var result = fracker.buildDiff({
    cwd: templateDir,
    files: templateInstalDB.files
  }, {
    cwd: appDir,
    files: appInstallDB.files
  });

  // Always run `src` files detached to avoid preventing updates
  // when we are indeed expecting those files to be updated.
  result.forEach(function(fileStat) {
    if (fileStat.file.dest.indexOf("src/") === 0) {
      fileStat.state = fracker.states.detached;
    }
  });

  var conflicts = result.filter(function(fileStat) {
    return fileStat.state === fracker.states.conflict;
  });

  if (conflicts.length) {
    console.error("Unable to update due to conflicts. Please manually update before continuing.");

    conflicts.forEach(function(fileStat) {
      console.error("[conflict] " + fileStat.file.dest);
    });

    return;
  }
  else {
    result.forEach(function(fileStat) {
      if (fileStat.state === fracker.states.detached) {
        fileStat.file.detached = true;
      }
      else if (fileStat.state === fracker.states.deleted) {
        fs.removeSync(path.join(appDir, fileStat.file.dest));
      }
      else {
        fs.copySync(path.join(templateDir, fileStat.file.src), path.join(appDir, fileStat.file.dest));
      }

      console.log("[" + fileStat.state + "]", fileStat.file.dest);
    });
  }

  // Update package.json to have the correct name of the application
  var newAppPackage = Object.assign({}, appPackage, {
    "scripts": Object.assign({}, appPackage.scripts, templatePackage.scripts),
    "devDependencies": Object.assign({}, appPackage.devDependencies, templatePackage.devDependencies),
    "dependencies": Object.assign({}, appPackage.dependencies, templatePackage.dependencies)
  });

  fs.writeFileSync(appPackagePath, jsonFormat(newAppPackage, { type: "space", size: 2}));

  var files = result
    .filter(function(fileStat) {
      return fileStat.state !== fracker.states.deleted;
    })
    .map(function(fileStat) {
      return fileStat.file;
    });

  // Write install db.
  fs.writeFileSync(path.join(appDir, ".install.db"), JSON.stringify({ files: files }));
}

module.exports = update;
