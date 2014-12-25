var debug = require("debug")("metalsmith-filename-date-and-slug");
var path = require("path");

module.exports = function(options) {
  options = options || {};
  var override = options.override || false;
  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      var filename = path.basename(file, path.extname(file));
      //debug("looking for date and slug from %s", filename);
      var m;
      if (m = filename.match(/(\d{4}-\d{2}-\d{2})-?(.*)/)) {
        var data = files[file];
        if (override || !data.date) {
          data.date = new Date(m[1]);
          debug("Extracted date from", file, data.date);
        }
        if (m[2] !== "" && (override || !data.slug)) {
          data.slug = m[2];
          debug("Extracted slug from", file, data.slug);
        }
      }
    });
  };
};
