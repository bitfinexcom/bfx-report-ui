import {
  put,
  call,
  // select,
  takeLatest,
} from 'redux-saga/effects'

// import config from 'config'
import { logger } from 'utils/logger'

import types from './constants'
import actions from './actions'
// import selectors from './selectors'


function* getElectronMenuConfig() {
  console.log('+++ start getElectronMenuConfig+++')
  try {
    const title = yield call([window.bfxReportElectronApi, 'getTitle'])
    const { menuTemplate, shouldMenuBeHidden } = yield call([window.bfxReportElectronApi, 'getMenuTemplate'])

    console.log('+++ title +++', title)
    console.log('+++ menuTemplate +++', menuTemplate)
    console.log('+++ shouldMenuBeHidden +++', shouldMenuBeHidden)

    yield put(actions.setElectronMenuTitle(title))
    yield put(actions.setElectronMenuTemplate(menuTemplate))
    yield put(actions.setElectronMenuHidden(shouldMenuBeHidden))
  } catch (error) {
    yield call(logger.error, error)
  }
}

export default function* electronMenuSaga() {
  yield takeLatest(types.GET_ELECTRON_MENU_CONFIG, getElectronMenuConfig)
}
