import { put, takeLatest } from 'redux-saga/effects'
import queryString from 'query-string'
import _omit from 'lodash/omit'

import { checkAuthWithToken, checkAuthWithLocalToken } from 'state/auth/actions'
import { setCustomTimeRange } from 'state/query/actions'
import types from './constants'

function* uiLoaded() {
  const parsed = queryString.parse(window.location.search)
  const { authToken, range } = parsed
  // handle custom time range
  if (range && range.indexOf('-') > -1) {
    const [startStr, endStr] = range.split('-')
    yield put(setCustomTimeRange(parseInt(startStr, 10), parseInt(endStr, 10)))
  }
  // handle authToken
  if (authToken) {
    // remove authToken param from url but keep others
    const params = _omit(parsed, 'authToken')
    const queries = queryString.stringify(params, { encode: false })
    const queryParams = queries ? `?${queries}` : ''
    window.history.pushState(null, null,
      window.location.href.replace(
        window.location.search,
        queryParams,
      ))
    yield put(checkAuthWithToken(authToken))
  } else {
    yield put(checkAuthWithLocalToken())
  }
}

export default function* uiSaga() {
  yield takeLatest(types.UI_LOADED, uiLoaded)
}
