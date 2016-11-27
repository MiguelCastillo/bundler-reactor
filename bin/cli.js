#!/usr/bin/env node

'use strict';

var fs = require("fs-extra");
var path = require("path");
var options = require("subarg")(process.argv.slice(2));
var actionsDir = path.join(__dirname, "../src/actions");

var actions = fs
  .readdirSync(actionsDir)
  .map(function(filename) {
    return path.basename(filename, ".js");
  });

var actionName = options._[0];
var appName = options._[1];

if (actions.indexOf(actionName) === -1) {
  appName = actionName;
  actionName = "create";
}

require(path.join(actionsDir, actionName))(appName);
