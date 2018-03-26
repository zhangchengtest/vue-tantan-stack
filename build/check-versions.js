var chalk = require('chalk')
var semver = require('semver')
var packageConfig = require('../package.json')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version)
    
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version')
    
  }
]

module.exports = function () {
  var warnings = []
  
}
