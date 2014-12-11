require('colors');
var exec = require('child_process').exec;

module.exports = function(config) {
  return {
    loadMetadata: function(metadata) {},

    loadCommands: function(program, metadata) {
      Object.keys(config.scripts).forEach(function(scriptName) {
        var script = config.scripts[scriptName];
        var params = script.command.split(' ');
        var commandName = params[0];
        params.splice(0, 1);
        var args = params.filter(function(param) {
          return param[0] !== '-';
        });
        var command = program.command(scriptName + ' ' + args.map(function(arg) { return '<' + arg+ '>'; }).join(' '));
        if (script.description) {
          command.description(script.description);
        }
        command.action(function() {
          var argsIndex = 0;
          var commandArguments = arguments;
          var args = params.map(function(param) {
            if (param[0] === '-') {
              return metadata[param.substring(1)];
            } else {
              var arg = commandArguments[argsIndex];
              argsIndex++;
              return arg;
            }
          });
          exec(commandName + ' ' + args.join(' '), function(error, stdout, stderr) {
            console.log(stdout, stderr.red);
          });
        });
      });
    }
  };
};
