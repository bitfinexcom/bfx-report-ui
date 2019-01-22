import {
  call,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'

import types from './constants'
import { getTheme } from './selectors'

function* updateTheme() {
  const theme = yield select(getTheme)
  document.body.className = theme
}

const WAIT_INTERVAL = 500

function* updateLang() {
  yield call(delay, WAIT_INTERVAL)
  window.location.reload()
}

export default function* baseSaga() {
  yield takeLatest(types.SET_THEME, updateTheme)
  yield takeLatest(types.UPDATE_THEME, updateTheme)
  yield takeLatest(types.SET_LANG, updateLang)
}
