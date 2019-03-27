const shell = require('shelljs')
require('dotenv').config()

const REQUIRED_ENVS = [
  'NODE_PATH',
  'PUBLIC_URL',
  'REACT_APP_PLATFORM',
  'REACT_APP_TITLE',
  'REACT_APP_LOGO_PATH',
]

const exitWithErrorMessage = (errorMessage) => {
  // eslint-disable-next-line no-console
  console.error(`\x1b[31m${errorMessage}\n`)
  process.exit(1)
}

REQUIRED_ENVS.forEach((env) => {
  if (!process.env[env]) {
    exitWithErrorMessage(
      `Expected environment variable ${env} to be set.
      See README.md for the details.`,
    )
  }
})

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
  ],
}

filesMap[platform].forEach((pair) => {
  // eslint-disable-next-line no-console
  console.log(`Copying file from ${pair.source} to ${pair.destination}`)
  const result = shell.cp(pair.source, pair.destination)
  if (result.code === 1) {
    throw result.stderr
  }
})
