import DEVICES from 'var/devices'

const getDeviceType = () => {
  const width = window.innerWidth

  if (width > 1024) {
    return DEVICES.DESKTOP
  }

  if (width < 768) {
    return DEVICES.PHONE
  }

  return DEVICES.TABLET
}

export default getDeviceType
