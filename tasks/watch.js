module.exports = {
  "dev": {
    "files": [
      "dist/**/*.js",
      "src/*.html",
      "img/*"
    ],
    "tasks": [
      "copy:static",
    ],
    "options": {
      "livereload": 32247
    }
  }
};
