/* eslint-disable max-len */

const DEFAULT_ELECTRON_VERSION = '3.0.1'

const config = {
  GITHUB_LINK: 'https://github.com/bitfinexcom/bfx-report-electron',
  LATEST_ELECTRON_RELEASE_LINK: 'https://api.github.com/repos/bitfinexcom/bfx-report-electron/releases/latest',
  DEFAULT_ELECTRON_VERSION,
  getElectronReleaseLink: ({ version, platform, ext = 'zip' }) => {
    const currExt = version === DEFAULT_ELECTRON_VERSION
      ? 'zip'
      : ext

    return `https://github.com/bitfinexcom/bfx-report-electron/releases/download/${version}/BitfinexReport-${version.replace('v', '')}-x64-${platform}.${currExt}`
  },
}

export default config
