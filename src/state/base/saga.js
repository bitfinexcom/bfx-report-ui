import {
  put,
  call,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { get } from '@bitfinex/lib-js-util-base'

import config from 'config'
import { makeFetchCall } from 'state/utils'
import i18n, { LANGUAGES } from 'locales/i18n'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import { setTimezone } from './actions'
import { getLocale, getTheme } from './selectors'

const { isElectronApp } = config
const getUsersTimeConf = () => makeFetchCall('getUsersTimeConf')

export function* fetchTimezone() {
  const { result } = yield call(getUsersTimeConf)

  if (result) {
    const timezone = get(result, 'timezoneName', types.DEFAULT_TIMEZONE)
    yield put(setTimezone(timezone))
  }
}

function* updateTheme() {
  document.documentElement.className = yield select(getTheme)
}

const WAIT_INTERVAL = 500

function* updateLang() {
  yield call(delay, WAIT_INTERVAL)
  const locale = yield select(getLocale)
  i18n.changeLanguage(LANGUAGES[locale])
}

function* updateElectronLang({ payload }) {
  try {
    if (!isElectronApp) return
    yield call(window?.bfxReportElectronApi?.setLanguage, { language: payload })
  } catch (error) {
    yield put(updateErrorStatus({
      id: 'status.fail',
      detail: error?.message ?? JSON.stringify(error),
    }))
  }
}

export default function* baseSaga() {
  yield takeLatest([types.SET_THEME, types.UPDATE_THEME, 'persist/REHYDRATE'], updateTheme)
  yield takeLatest(types.SET_LANG, updateLang)
  yield takeLatest(types.SET_ELECTRON_LANG, updateElectronLang)
}
