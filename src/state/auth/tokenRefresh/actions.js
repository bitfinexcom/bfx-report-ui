import tokenRefresh from './constants'

export function refreshToken() {
  return {
    type: tokenRefresh.REFRESH,
  }
}

export function tokenRefreshStart() {
  return {
    type: tokenRefresh.START,
  }
}

export function tokenRefreshStop() {
  return {
    type: tokenRefresh.STOP,
  }
}

export default {
  refreshToken,
  tokenRefreshStart,
  tokenRefreshStop,
}
