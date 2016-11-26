var fallback = require("connect-history-api-fallback");
var livereload = require("connect-livereload");

module.exports = {
  "dev": {
    "options": {
      "base": "dist",
      "protocol": "http",
      "port": 8045,
      "hostname": "localhost",
      "keepalive": true,
      "open": "http://localhost:8045/index.html",
      "middleware": function(connect, options, middlewares) {
        middlewares.unshift(fallback({ index: "/index.html" }));
        middlewares.unshift(livereload({ port: 32247 }));
        return middlewares;
      }
    }
  }
};
