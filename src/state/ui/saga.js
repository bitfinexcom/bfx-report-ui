import {
  call, take, put, takeLatest,
} from 'redux-saga/effects'

import {
  setApiKey, setApiSecret, setAuthToken, updateTheme,
} from 'state/base/actions'
import { checkAuth } from 'state/auth/actions'
import { setCustomTimeRange } from 'state/query/actions'
import { getParsedUrlParams, getNoAuthUrlString } from 'state/utils'
import { isSynched } from 'state/sync/saga'
import { platform } from 'var/config'

import types from './constants'
import { toggleFrameworkDialog } from './actions'

function* uiLoaded() {
  // update theme from pref
  yield put(updateTheme())

  const parsed = getParsedUrlParams(window.location.search)
  const {
    authToken, apiKey, apiSecret, range,
  } = parsed

  // handle custom time range
  if (range && range.indexOf('-') > -1) {
    const [startStr, endStr] = range.split('-')
    yield put(setCustomTimeRange(parseInt(startStr, 10), parseInt(endStr, 10)))
  }
  // handle authToken
  if (authToken || (apiKey && apiSecret)) {
    window.history.pushState(null, null,
      window.location.href.replace(
        window.location.search,
        getNoAuthUrlString(window.location.search),
      ))

    if (authToken) {
      yield put(setAuthToken(authToken))
    }

    if (apiKey && apiSecret) {
      yield put(setApiKey(apiKey))
      yield put(setApiSecret(apiSecret))
    }
  }

  yield put(checkAuth())
}

export function* frameworkCheck() {
  if (!platform.showFrameworkMode || localStorage.getItem('isFrameworkDialogDisabled')) {
    return true
  }
  if (yield call(isSynched)) {
    return true
  }
  yield put(toggleFrameworkDialog())

  const { payload: { shouldProceed, isFrameworkDialogDisabled } } = yield take(types.PROCEED_FRAMEWORK_REQUEST)
  if (isFrameworkDialogDisabled) {
    // save timestamp for future use
    const disablingTime = new Date().getTime()
    localStorage.setItem('isFrameworkDialogDisabled', disablingTime)
  }

  return shouldProceed
}

export default function* uiSaga() {
  yield takeLatest(types.UI_LOADED, uiLoaded)
}
