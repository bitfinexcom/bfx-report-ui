const fs = require('fs')

if (!process.env.REACT_APP_PLATFORM) {
  console.error('>>> REACT_APP_PLATFORM IS REQUIRED')
  console.error('>>> Make sure you have exported the related env variables\n\n')
}

const platform = ['localhost', 'bitfinex'].includes(process.env.REACT_APP_PLATFORM)
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
  console.warn(`Copying file from ${source} to ${destination}`)
  const template = fs.readFileSync(source, 'utf8')
  fs.writeFileSync(destination, template, 'utf8')
}

filesMap[platform].forEach(pair => {
  copyFile(pair.source, pair.destination)
})
