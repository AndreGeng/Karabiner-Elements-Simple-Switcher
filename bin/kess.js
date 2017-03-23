#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var DEFAULT_CONFIG = {
  PROFILE_INDEX: 0,
  CONFIG_FILE: '.config/karabiner/karabiner.json'
}
var configFileLocation = path.resolve(process.env.HOME, DEFAULT_CONFIG.CONFIG_FILE);
var argv = require('yargs')
  .number('p')
  .alias('p', 'profile')
  .alias('h', 'help')
  .option('p', {
    demand: true,
    default: DEFAULT_CONFIG.PROFILE_INDEX
  })
  .help('h')
  .argv;
delete require.cache[configFileLocation]
var configFile = require(configFileLocation);
configFile.profiles.map(function(item, index) {
  if (index === argv.p) {
    item.selected = true;
  } else {
    item.selected = false;
  }
  return false;
});
fs.writeFileSync(configFileLocation, JSON.stringify(configFile));
