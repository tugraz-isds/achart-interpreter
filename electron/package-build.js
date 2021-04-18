const packager = require('electron-packager')
const { serialHooks } = require('electron-packager/src/hooks')
const fs = require('fs');
const path = require('path')
const tmp = require('tmp');

async function bundleElectronApp(options) {
  const appPaths = await packager(options)
  console.log('Electron app bundles created:')
  console.log(appPaths.toString())
}

function prepareStandalonePackageJSON() {
  const file_name = '../package.json';
  const file = require(file_name);

  // Modify these two values as electron-packager needs the 
  // electron JS file as main
  file['main'] = "electron/elec.js";
  file['scripts']['electron'] = "electron ./electron/elec.js";

  const tmpobj = tmp.fileSync();
  let out_file_name = tmpobj.name;
  fs.writeFile(out_file_name, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });

  return out_file_name;
}

let modified_package_json = prepareStandalonePackageJSON();

let platform = ['linux', 'darwin', 'win32'];
if (process.argv.length > 2)
{
  platform_arg = process.argv[2];
  switch(platform_arg)
  {
    // Let user supply friendlier platform names
    // than what electron-packager requires
    case 'linux':
      platform = 'linux';
      break;
    case 'mac':
      platform = 'darwin';
      break;
    case 'win':
      platform = 'win32';
      break;
  }
}

const opts = {
  arch: 'x64',
  name: 'AChartInterpreter',
  platform: platform,
  dir: '.',
  out: './packages',
  overwrite: true,
  afterCopy: [serialHooks([
    (buildPath) => {
      fs.copyFile(modified_package_json, path.join(buildPath, 'package.json'), (err) => {
        if (err) throw err;
      });
    }
  ])]
}

bundleElectronApp(opts);
