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
import TAX_REPORT_SECTIONS from 'components/TaxReport/TaxReport.sections'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

const getReqTaxReport = (params) => {
  const { start, end, auth } = params
  return makeFetchCall('getFullTaxReport', auth, { start, end })
}

const getReqTaxReportSnapshot = (auth, end) => {
  const params = end ? { end } : {}
  return makeFetchCall('getFullSnapshotReport', auth, params)
}

/* eslint-disable-next-line consistent-return */
function* fetchTaxReport() {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateTaxReport())
    }

    const params = yield select(selectors.getParams)

    const auth = yield select(selectAuth)
    const { result, error } = yield call(getReqTaxReport, { auth, ...params })

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

/* eslint-disable-next-line consistent-return */
function* fetchTaxReportSnapshot({ payload: section }) {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateTaxReportSnapshot({ section }))
    }

    const params = yield select(selectors.getParams)
    const timestamp = (section === TAX_REPORT_SECTIONS.START_SNAPSHOT)
      ? params.start
      : params.end

    const auth = yield select(selectAuth)
    const { result, error } = yield call(getReqTaxReportSnapshot, auth, timestamp)

    yield put(actions.updateTaxReportSnapshot({ result, section }))

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

// fetch section that is currently open, others will fetch when opened
function* refreshTaxReport({ payload }) {
  const { section } = payload

  if (section === TAX_REPORT_SECTIONS.RESULT) {
    yield put(actions.fetchTaxReport())
  } else {
    yield put(actions.fetchTaxReportSnapshot(section))
  }
}

function* fetchTaxReportFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* taxReportSaga() {
  yield takeLatest(types.FETCH_TAX_REPORT, fetchTaxReport)
  yield takeLatest(types.FETCH_SNAPSHOT, fetchTaxReportSnapshot)
  yield takeLatest([types.SET_PARAMS, types.REFRESH], refreshTaxReport)
  yield takeLatest(types.FETCH_FAIL, fetchTaxReportFail)
}
