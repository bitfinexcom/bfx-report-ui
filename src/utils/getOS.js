export const PLATFORMS = {
  mac: 'mac',
  windows: 'win',
  linux: 'linux',
}

export const getOS = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const { userAgent } = window.navigator

  if (userAgent.includes('Win')) {
    return PLATFORMS.windows
  }
  if (userAgent.includes('Mac')) {
    return PLATFORMS.mac
  }
  return PLATFORMS.linux
}

export default getOS
