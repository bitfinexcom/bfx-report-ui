import { call, select, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import types from './constants'

function* updateTheme() {
  const theme = yield select(state => state.base.theme)
  document.body.className = theme
}

const WAIT_INTERVAL = 500

function* updateLang() {
  yield call(delay, WAIT_INTERVAL)
  window.location.reload()
}

export default function* baseSaga() {
  yield takeLatest(types.SET_THEME, updateTheme)
  yield takeLatest(types.SET_LANG, updateLang)
}
