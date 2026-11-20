import _map from 'lodash/map'

import { PLATFORMS } from 'utils/getOS'
import config from 'var/electronVersion'

import { getDownloadOptions } from '../AppDownload.helpers'

const { DEFAULT_ELECTRON_VERSION } = config

const RELEASES_URL = 'https://github.com/bitfinexcom/bfx-report-electron/releases/download'

describe('getDownloadOptions', () => {
  it('linux -> DEB and AppImage options', () => {
    expect(getDownloadOptions('v4.48.0', PLATFORMS.linux)).toEqual([
      {
        id: 'deb',
        label: 'DEB',
        hint: 'download_app.deb_hint',
        link: `${RELEASES_URL}/v4.48.0/BitfinexReport-4.48.0-x64-linux.deb`,
      },
      {
        id: 'AppImage.zip',
        label: 'AppImage',
        hint: 'download_app.appimage_hint',
        link: `${RELEASES_URL}/v4.48.0/BitfinexReport-4.48.0-x64-linux.AppImage.zip`,
      },
    ])
  })

  it('mac -> single DMG option', () => {
    expect(getDownloadOptions('v4.48.0', PLATFORMS.mac)).toEqual([
      {
        id: 'dmg',
        label: 'DMG',
        link: `${RELEASES_URL}/v4.48.0/BitfinexReport-4.48.0-x64-mac.dmg`,
      },
    ])
  })

  it('windows -> single EXE option', () => {
    expect(getDownloadOptions('v4.48.0', PLATFORMS.windows)).toEqual([
      {
        id: 'exe',
        label: 'EXE',
        link: `${RELEASES_URL}/v4.48.0/BitfinexReport-4.48.0-x64-win.exe`,
      },
    ])
  })

  it('unknown platform -> linux options', () => {
    expect(_map(getDownloadOptions('v4.48.0', 'unknown'), 'id')).toEqual(['deb', 'AppImage.zip'])
  })

  it('default version -> v-prefixed release path, selected ext is kept', () => {
    const version = DEFAULT_ELECTRON_VERSION

    expect(_map(getDownloadOptions(version, PLATFORMS.linux), 'link')).toEqual([
      `${RELEASES_URL}/v${version}/BitfinexReport-${version}-x64-linux.deb`,
      `${RELEASES_URL}/v${version}/BitfinexReport-${version}-x64-linux.AppImage.zip`,
    ])
  })
})
