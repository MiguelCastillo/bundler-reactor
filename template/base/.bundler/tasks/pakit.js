module.exports = {
  options: {
    files: [{
      src: "src/index.js",
      dest: "dist/index.js"
    }]
  },
  dev: {
    watch: true,
    minify: false
  },
  build: {
  }
};
