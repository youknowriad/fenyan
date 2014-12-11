var jf = require('jsonfile');
var fs = require('fs');
var program = require('commander');

var configFile = process.cwd() + '/fenyan.json';
if (!fs.existsSync(configFile)) {
  console.log('No fenyan.json file found');
  return;
}

var config = jf.readFileSync(configFile);
var basePlugins = {
  composer: './plugins/composer',
  shell: './plugins/shell'
};
var requiredPlugins = config.use ? config.use.map(function(pluginName) {
  return basePlugins[pluginName] ? basePlugins[pluginName] : 'fenyan-' + pluginName;
}) : [];
var plugins = ['./plugins/base'].concat(requiredPlugins);
var metadata = {};
program.version('1.0.0');
plugins.forEach(function(pluginModule) {
  var plugin = require(pluginModule)(config);
  plugin.loadMetadata(metadata);
  plugin.loadCommands(program, metadata);
});

program.parse(process.argv);
