import { isEqual } from '@bitfinex/lib-js-util-base'

import { PLATFORMS } from 'utils/getOS'

const DEFAULT_ELECTRON_VERSION = '4.17.0'

const APP_RELEASES_URL = 'https://github.com/bitfinexcom/bfx-report-electron/releases/download/'

const getDefaultExt = (platform) => {
  if (isEqual(platform, PLATFORMS.windows)) {
    return 'exe'
  }
  if (isEqual(platform, PLATFORMS.linux)) {
    return 'AppImage.zip'
  }

  return 'zip'
}

const config = {
  GITHUB_LINK: 'https://github.com/bitfinexcom/bfx-report-electron',
  LATEST_ELECTRON_RELEASE_LINK: 'https://api.github.com/repos/bitfinexcom/bfx-report-electron/releases/latest',
  DEFAULT_ELECTRON_VERSION,
  getElectronReleaseLink: ({ version, platform, ext = getDefaultExt(platform) }) => {
    const normVersion = version.replace('v', '')
    const currExt = normVersion === DEFAULT_ELECTRON_VERSION
      ? getDefaultExt(platform)
      : ext

    return `${APP_RELEASES_URL}/${version}/BitfinexReport-${normVersion}-x64-${platform}.${currExt}`
  },
}

export default config
