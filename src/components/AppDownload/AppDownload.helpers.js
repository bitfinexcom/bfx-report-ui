import _get from 'lodash/get'
import _map from 'lodash/map'

import config from 'var/electronVersion'
import { getOS, PLATFORMS } from 'utils/getOS'

const { getElectronReleaseLink } = config

const DOWNLOAD_TYPES = {
  [PLATFORMS.mac]: [{ ext: 'dmg', label: 'DMG' }],
  [PLATFORMS.windows]: [{ ext: 'exe', label: 'EXE' }],
  [PLATFORMS.linux]: [
    { ext: 'deb', label: 'DEB', hint: 'download_app.deb_hint' },
    { ext: 'AppImage.zip', label: 'AppImage', hint: 'download_app.appimage_hint' },
  ],
}

export const getDownloadOptions = (version, platform = getOS()) => _map(
  _get(DOWNLOAD_TYPES, platform, DOWNLOAD_TYPES[PLATFORMS.linux]),
  ({ ext, ...option }) => ({
    ...option,
    id: ext,
    link: getElectronReleaseLink({ version, platform, ext }),
  }),
)

export default getDownloadOptions
