const installer = require('electron-installer-redhat')

const options = {
  src: 'packages/AChartInterpreter-linux-x64/',
  dest: 'installers/rpm/',
  arch: 'x86_64'
}

async function main (options) {
  console.log('Creating installer (this may take a while)')

  try {
    await installer(options)
    console.log(`Successfully created installer at ${options.dest}`)
  } catch (err) {
    console.error(err, err.stack)
    process.exit(1)
  }
}

main(options)
