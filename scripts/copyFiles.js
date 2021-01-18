const shell = require('shelljs')

const filesMap = [
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
]

filesMap.forEach((pair) => {
  // eslint-disable-next-line no-console
  console.log(`Copying file from ${pair.source} to ${pair.destination}`)
  const result = shell.cp(pair.source, pair.destination)
  if (result.code === 1) {
    throw result.stderr
  }
})
