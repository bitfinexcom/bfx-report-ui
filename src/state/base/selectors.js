export const getBase = state => state.base

export const getApiKey = state => getBase(state).apiKey
export const getApiSecret = state => getBase(state).apiSecret
export const getLocale = state => getBase(state).locale
export const getTheme = state => getBase(state).theme

export default {
  getBase,
  getApiKey,
  getApiSecret,
  getLocale,
  getTheme,
}
