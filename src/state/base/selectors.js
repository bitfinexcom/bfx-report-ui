export const getBase = state => state.base

export const getApiKey = state => getBase(state).apiKey
export const getApiSecret = state => getBase(state).apiSecret
export const getAuthToken = state => getBase(state).authToken
export const getLocale = state => getBase(state).locale
export const getMenuMode = state => getBase(state).menuMode
export const getTheme = state => getBase(state).theme
export const getTimezone = state => getBase(state).timezone

export default {
  getBase,
  getApiKey,
  getApiSecret,
  getAuthToken,
  getLocale,
  getMenuMode,
  getTheme,
  getTimezone,
}
