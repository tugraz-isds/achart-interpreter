const electronInstaller = require('electron-winstaller');

const options = {
  src: 'packages/AChartInterpreter-win32-x64/',
  dest: 'installers/win/',
}

async function main (options) {
  console.log('Creating installer (this may take a while)')
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: options.src,
      outputDirectory: options.dest,
      authors: 'Graz University of Technology',
      exe: 'AChartInterpreter.exe'
    });
    console.log(`Successfully created installer at ${options.dest}`)
  } catch (e) {
    console.error(e, e.stack)
    process.exit(1)
  }
}

main(options)

