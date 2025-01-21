import {
  put,
  call,
  // select,
  takeLatest,
} from 'redux-saga/effects'

// import config from 'config'

import types from './constants'
import actions from './actions'
// import selectors from './selectors'


function* getElectronMenuConfig() {
  const title = yield call(window?.bfxReportElectronApi?.getTitle())
  const { menuTemplate, shouldMenuBeHidden } = yield call(window?.bfxReportElectronApi?.getMenuTemplate())

  yield put(actions.setElectronMenuTitle(title))
  yield put(actions.setElectronMenuTemplate(menuTemplate))
  yield put(actions.setElectronMenuHidden(shouldMenuBeHidden))
}

export default function* electronMenuSaga() {
  yield takeLatest(types.GET_ELECTRON_MENU_CONFIG, getElectronMenuConfig)
}
