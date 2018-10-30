import { put, takeLatest } from 'redux-saga/effects'

import { checkAuthWithToken, checkAuthWithLocalToken } from 'state/auth/actions'
import { setCustomTimeRange } from 'state/query/actions'
import { getParsedUrlParams, getNoAuthTokenUrlString } from 'state/utils'

import types from './constants'

function* uiLoaded() {
  const parsed = getParsedUrlParams(window.location.search)
  const { authToken, range } = parsed
  // handle custom time range
  if (range && range.indexOf('-') > -1) {
    const [startStr, endStr] = range.split('-')
    yield put(setCustomTimeRange(parseInt(startStr, 10), parseInt(endStr, 10)))
  }
  // handle authToken
  if (authToken) {
    window.history.pushState(null, null,
      window.location.href.replace(
        window.location.search,
        getNoAuthTokenUrlString(window.location.search),
      ))
    yield put(checkAuthWithToken(authToken))
  } else {
    yield put(checkAuthWithLocalToken())
  }
}

export default function* uiSaga() {
  yield takeLatest(types.UI_LOADED, uiLoaded)
}
