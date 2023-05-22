import _includes from 'lodash/includes'
import _isUndefined from 'lodash/isUndefined'

export const PLATFORMS = {
  mac: 'mac',
  windows: 'win',
  linux: 'linux',
}

export const getOS = () => {
  if (_isUndefined(typeof window)) {
    return null
  }

  const { userAgent } = window.navigator

  if (_includes(userAgent, 'Win')) {
    return PLATFORMS.windows
  }
  if (_includes(userAgent, 'Mac')) {
    return PLATFORMS.mac
  }
  return PLATFORMS.linux
}

export default {
  getOS,
  PLATFORMS,
}
