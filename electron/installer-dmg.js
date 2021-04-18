const createDMG = require('electron-installer-dmg')

const options = {
  appPath: 'packages/AChartInterpreter-darwin-x64/',
  out: 'installers/dmg/',
  name: 'achartinterpreter'
}

createDMG(options, function done (err) {
  console.log('Finished.')
})
