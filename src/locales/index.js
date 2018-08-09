import { addLocaleData } from 'react-intl'

import enUS from './en-US'
import zhHANT from './zh-Hant'

addLocaleData(enUS.data)
addLocaleData(zhHANT.data)

export const getLocale = () => {
  const value = localStorage.getItem('persist:bfx')
  const local = JSON.parse(value)
  const base = (local && local.base && JSON.parse(local.base)) || {}
  const lang = base.locale || 'en'
  switch (lang) {
    case 'tw':
      return zhHANT
    case 'en':
      return enUS
    default:
      return enUS
  }
}

export default {
  getLocale,
}
