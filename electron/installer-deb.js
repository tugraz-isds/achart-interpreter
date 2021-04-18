const installer = require('electron-installer-debian')
const fs = require('fs');
const tmp = require('tmp');

const options = {
  src: 'packages/AChartInterpreter-linux-x64/',
  dest: 'installers/deb/',
  arch: 'amd64'
}

function prepareStandalonePackageJSON() {
  const file_name = '../package.json';
  const file = require(file_name);

  file['main'] = "elec.js";
  file['scripts']['electron'] = "electron .";

  const tmpobj = tmp.fileSync();
  let out_file_name = tmpobj.name;
  fs.writeFile(out_file_name, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });

  return out_file_name;
}

async function main (options) {
  // Modify package.json to electron-installer-debian's liking
  let modified_package_json = prepareStandalonePackageJSON();

  // Save backup of original package.json
  await fs.copyFile('package.json', 'package.json_backup', (err) => {
    if (err) throw err;
  });

  // Overwrite original package.json with modified one
  await fs.copyFile(modified_package_json, 'package.json', (err) => {
    if (err) throw err;
  });

  console.log('Creating installer (this may take a while)')
  try {
    await installer(options)
    console.log(`Successfully created installer at ${options.dest}`)

    // Restore original package.json
    await fs.rename('package.json_backup', 'package.json', (err) => {
      if (err) throw err;
    });
    console.log('Cleanup done.')
    process.exit()
  } catch (err) {
    console.error(err, err.stack)
    process.exit(1)
  }
}

main(options)
