const shell = require('shelljs')
require('dotenv').config()

const REQUIRED_ENVS = [
  'NODE_PATH',
  'REACT_APP_PLATFORM',
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
      destination: 'src/ui/PlatformLogo/files/logo-dark-theme.svg',
    },
    {
      source: 'scripts/template/bitfinex-logo-light.svg',
      destination: 'src/ui/PlatformLogo/files/logo-light-theme.svg',
    },
    {
      source: 'scripts/template/bitfinex-favicon.ico',
      destination: 'public/favicon.ico',
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
