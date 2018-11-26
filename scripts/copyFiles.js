const fs = require('fs')

function hasEnv() {
  const ENVS = [
    'NODE_PATH',
    'PUBLIC_URL',
    'REACT_APP_PLATFORM',
    'REACT_APP_TITLE',
    'REACT_APP_LOGO_PATH',
  ]
  let result = true
  console.log('=========================')
  ENVS.forEach(env => {
    if (!process.env.hasOwnProperty(env)) {
      result = false
      console.error(`>>> ${env} IS REQUIRED`)
      console.error('>>> Make sure you have exported the related env variables\n\n')
    } else {
      console.error(`Get ${env} as ${process.env[env]}`)
    }
  })
  console.log('=========================')
  return result
}

if (!process.env.REACT_APP_PLATFORM) {
  console.error('>>> REACT_APP_PLATFORM IS REQUIRED')
  console.error('>>> Make sure you have exported the related env variables\n\n')
}

const platform = ['localhost', 'test', 'bitfinex'].includes(process.env.REACT_APP_PLATFORM)
  ? 'bitfinex'
  : process.env.REACT_APP_PLATFORM

const filesMap = {
  bitfinex: [
    {
      source: 'scripts/template/bitfinex-logo-dark.svg',
      destination: 'src/components/Header/logo3-dark-theme.svg',
    },
    {
      source: 'scripts/template/bitfinex-mlogo-dark.svg',
      destination: 'src/components/Header/mobile_logo_dark.svg',
    },
    {
      source: 'scripts/template/bitfinex-favicon.ico',
      destination: 'public/favicon.ico',
    },
  ],
  ethfinex: [
    {
      source: 'scripts/template/ethfinex-logo-dark.svg',
      destination: 'src/components/Header/logo3-dark-theme.svg',
    },
    {
      source: 'scripts/template/ethfinex-mlogo-dark.svg',
      destination: 'src/components/Header/mobile_logo_dark.svg',
    },
    {
      source: 'scripts/template/ethfinex-favicon.png',
      destination: 'public/favicon.png',
    },
  ]
}

const copyFile = (source, destination) => {
  fs.copyFile(source, destination, (err) => {
    if (err) throw err;
    console.log(`Copying file from ${source} to ${destination}`)
  });
}

if (hasEnv()) {
  filesMap[platform].forEach(pair => {
    copyFile(pair.source, pair.destination)
  })
}
