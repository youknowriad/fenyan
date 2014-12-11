require('colors');

module.exports = function(config) {
  return {
    loadMetadata: function(metadata) {
      metadata.project = config.project;
      metadata.description = config.description ? config.description : 'no description';
    },

    loadCommands: function(program, metadata) {
      program.command('metadata <key>')
        .description('get Metadata key')
        .action(function(key) {
          if (metadata[key] !== undefined) {
            console.log('metadata "' + key.green +'" = ' + metadata[key].green);
          } else {
            console.log(('no metadata key "' + key +'" found').red);
          }
        });
    }
  };
};
