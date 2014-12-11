var jf = require('jsonfile');
var fs = require('fs');

module.exports = function(config) {

  var configFile = process.cwd() + '/composer.json';
  if (!fs.existsSync(configFile)) {
    throw Error('No composer.json file found');
  }
  var composer = jf.readFileSync(configFile);

  return {
    loadMetadata: function(metadata) {
      if (composer.version) {
        metadata.version = composer.version;
      }
    },

    loadCommands: function(program, metadata) {}
  };
};
