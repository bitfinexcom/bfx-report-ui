import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { frameworkCheck } from 'state/ui/saga'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

const getReqTaxReport = (params) => {
  const { start, end, auth } = params
  return makeFetchCall('getFullTaxReport', auth, { start, end })
}

/* eslint-disable-next-line consistent-return */
function* fetchTaxReport({ payload }) {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateTaxReport())
    }
    // save current query time in state for csv export reference
    yield put(actions.setParams(payload))

    const auth = yield select(selectAuth)
    const { result, error } = yield call(getReqTaxReport, { auth, ...payload })

    yield put(actions.updateTaxReport(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'taxreport.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'taxreport.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshTaxReport() {
  const params = yield select(selectors.getParams)
  yield call(fetchTaxReport, { payload: params })
}

function* fetchTaxReportFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* taxReportSaga() {
  yield takeLatest(types.FETCH_TAX_REPORT, fetchTaxReport)
  yield takeLatest(types.REFRESH, refreshTaxReport)
  yield takeLatest(types.FETCH_FAIL, fetchTaxReportFail)
}
