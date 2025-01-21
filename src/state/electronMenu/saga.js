import {
  put,
  call,
  select,
  takeLatest,
} from 'redux-saga/effects'

// import config from 'config'

import types from './constants'
// import selectors from './selectors'


function* getElectronMenuConfig() {
  const title = yield call(window?.bfxReportElectronApi?.getTitle())
  const { menuTemplate, shouldMenuBeHidden } = yield call(window?.bfxReportElectronApi?.getMenuTemplate())

  yield put(setLang(lang))
  yield put(getElectronMenuConfig())
}

export default function* electronMenuSaga() {
  yield takeLatest(types.GET_ELECTRON_MENU_CONFIG, getElectronMenuConfig)
}
