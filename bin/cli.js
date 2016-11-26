#!/usr/bin/env node

'use strict';

var fs = require("fs-extra");
var path = require("path");
var jsonFormat = require("json-format");
var options = require("subarg")(process.argv.slice(2));

var appName = options._[0];
var appDir = path.join(process.cwd(), appName);
var templateDir = path.join(__dirname, "../", "template");

// ensure app directory exists
fs.ensureDirSync(appDir);

// Copy template directory
fs.copySync(templateDir, appDir);

// Update package.json to have the correct name of the application
var templatePackage = require("../template/package.json");
templatePackage.name = appName;

fs.writeFileSync(path.join(appDir, "package.json"), jsonFormat(templatePackage, { type: "space", size: 2}));
