import {
  put,
  call,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _get from 'lodash/get'

import i18n, { LANGUAGES } from 'locales/i18n'
import { selectAuth } from 'state/auth/selectors'
import { makeFetchCall } from 'state/utils'

import types from './constants'
import { setTimezone } from './actions'
import { getLocale, getTheme } from './selectors'

const getUsersTimeConf = auth => makeFetchCall('getUsersTimeConf', auth)

export function* fetchTimezone() {
  const auth = yield select(selectAuth)
  const { result } = yield call(getUsersTimeConf, auth)

  if (result) {
    const timezone = _get(result, 'timezoneName', types.DEFAULT_TIMEZONE)
    yield put(setTimezone(timezone))
  }
}

function* updateTheme() {
  document.body.className = yield select(getTheme)
}

const WAIT_INTERVAL = 500

function* updateLang() {
  yield call(delay, WAIT_INTERVAL)
  const locale = yield select(getLocale)
  i18n.changeLanguage(LANGUAGES[locale])
}

export default function* baseSaga() {
  yield takeLatest([types.SET_THEME, types.UPDATE_THEME, 'persist/REHYDRATE'], updateTheme)
  yield takeLatest(types.SET_LANG, updateLang)
}
