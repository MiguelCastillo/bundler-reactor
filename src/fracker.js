var fs = require("fs-extra");
var path = require("path");
var crypto = require('crypto');

var states = {
  /** new file */
  "new": "new",
  /** deleted in dest and readded from src */
  "added": "added",
  /** deleted from and src and dest */
  "deleted": "deleted",
  /** changed from src */
  "updated": "updated",
  /** unchanged in src and dest */
  "unchanged": "unchanged",
  /** changed in src and changed in dest and they are not equal */
  "conflict": "conflict",
  /** no longer in source and dest is changed */
  "detached": "detached"
};

function init(templateDir) {
  return fs
    .walkSync(templateDir)
    .map(function(filepath) {
      return {
        filepath: filepath,
        relative: filepath.replace(templateDir + "/", "")
      };
    })
    .map(function(src) {
      return {
        src: src.relative,
        dest: src.relative,
        hash: getHash(fs.readFileSync(src.filepath))
      };
    });
}

function buildDiff(srcFiles, destFiles) {
  var srcStatMap = {};
  var destStatMap = {};
  var srcCwd = srcFiles.cwd || process.cwd();
  var destCwd = destFiles.cwd || process.cwd();
  srcFiles = srcFiles.files || srcFiles;
  destFiles = destFiles.files || destFiles;

  srcFiles.forEach(function(file) {
    var filepath =  path.join(srcCwd, file.src);
    srcStatMap[file.src] = buildFileStat(filepath, file);
  });

  destFiles.forEach(function(file) {
    var filepath = path.join(destCwd, file.dest);
    destStatMap[file.src] = buildFileStat(filepath, file);
  });

  var result = Object
    .keys(srcStatMap)
    .map(function(filepath) {
      var srcFileStat = srcStatMap[filepath];
      var destFileStat = destStatMap[filepath];

      if (destFileStat) {
        var destState = destFileStat.state;

        if (destState === states.detached) {
          srcFileStat.state = states.detached;
        }
        if (destState === states.deleted) {
          srcFileStat.state = states.added;
        }
        else if (destState === states.changed) {
          srcFileStat.state = destFileStat.file.hash === srcFileStat.file.hash ? states.unchanged : states.conflict;

          if (srcFileStat.state === states.conflict) {
            srcFileStat.conflict = destFileStat;
          }
        }
        else if (destState === states.unchanged) {
          if (destFileStat.file.hash !== srcFileStat.file.hash) {
            srcFileStat.state = states.updated;
          }
        }

        delete destStatMap[filepath];
      }
      else {
        srcFileStat.state = states.new;
      }

      return srcFileStat;
    });

  Object
    .keys(destStatMap)
    .map(function(filepath) {
      return destStatMap[filepath];
    })
    .forEach(function(fileStat) {
      fileStat.state = fileStat.state === states.unchanged ? states.deleted : states.detached;
      result.push(fileStat);
    });

  return result;
}

function buildFileStat(filepath, file) {
  var exists = fs.existsSync(filepath);
  var hash = exists ? getHash(fs.readFileSync(filepath)) : null;
  var changed = hash !== file.hash;
  var deleted = file.hash && !exists;

  var state = file.detached ? states.detached :
        deleted ? states.deleted :
        changed ? states.changed :
        states.unchanged;

  return {
    state: state,
    file: Object.assign({}, file, { hash: hash })
  };
}

function getHash(message) {
  var hash = crypto.createHash('sha256');
  hash.update(message);
  return hash.digest('hex');
}

module.exports = {
  states: states,
  init: init,
  buildDiff: buildDiff,
  buildFileStat: buildFileStat,
  getHash: getHash
};
