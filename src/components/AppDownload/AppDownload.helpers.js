import config from 'var/electronVersion'
import { getOS, PLATFORMS } from 'utils/getOS'

const { getElectronReleaseLink } = config

export const getDownloadLink = (version) => {
  const platform = getOS()

  switch (platform) {
    case PLATFORMS.mac:
      return getElectronReleaseLink({ version, platform, ext: 'zip' })
    case PLATFORMS.windows:
      return getElectronReleaseLink({ version, platform, ext: 'exe' })
    case PLATFORMS.linux:
    default:
      return getElectronReleaseLink({ version, platform, ext: 'AppImage.zip' })
  }
}

export default getDownloadLink
