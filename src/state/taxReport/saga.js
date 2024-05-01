import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { toggleErrorDialog } from 'state/ui/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getTimeFrame } from 'state/timeRange/selectors'
import TAX_REPORT_SECTIONS from 'components/TaxReport/TaxReport.sections'

import types from './constants'
import actions from './actions'
import { getTransactionsStrategy } from './selectors'

const transctionsResult = [
  {
    asset: 'LTC',
    amount: 1.43796106,
    mtsAcquired: 1712042016000,
    mtsSold: 1712042359302,
    proceeds: 142.64861307412,
    cost: 142.41853930451998,
    gainOrLoss: -0.23007376960001125,
  },
  {
    asset: 'BTC',
    amount: 0.001342,
    mtsAcquired: 1649771737942,
    mtsSold: 1709584808125,
    proceeds: 90.838638,
    cost: 54.303808778059306,
    gainOrLoss: 36.5348292219407,
  },
  {
    asset: 'LTC',
    amount: 1e-8,
    mtsAcquired: 1706858241000,
    mtsSold: 1706861968714,
    proceeds: 6.7707e-7,
    cost: 6.7876e-7,
    gainOrLoss: -1.6900000000000634,
  },
]

export const getReqTaxReport = (params) => {
  const { start, end } = params
  return makeFetchCall('getFullTaxReport', { start, end })
}

const getReqTaxReportSnapshot = (end) => {
  const params = end ? { end } : {}
  return makeFetchCall('getFullSnapshotReport', params)
}

export const getReqTaxTransactions = (params) => makeFetchCall('getTransactionTaxReport', params)

/* eslint-disable-next-line consistent-return */
export function* fetchTaxReport() {
  try {
    const { start, end } = yield select(getTimeFrame)
    const { result, error } = yield call(getReqTaxReport, {
      start,
      end,
    })

    yield put(actions.updateTaxReport(result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
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
    const { start, end } = yield select(getTimeFrame)
    const timestamp = (section === TAX_REPORT_SECTIONS.START_SNAPSHOT)
      ? start
      : end

    const { result, error } = yield call(getReqTaxReportSnapshot, timestamp)

    yield put(actions.updateTaxReportSnapshot({ result, section }))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
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

  if (section === TAX_REPORT_SECTIONS.RESULT || TAX_REPORT_SECTIONS.TRANSACTIONS) {
    yield put(actions.fetchTaxReport())
  } else {
    yield put(actions.fetchTaxReportSnapshot(section))
  }
}

export function* fetchTransactions() {
  yield put(actions.updateTaxReportTransactions(transctionsResult))
  try {
    const { start, end } = yield select(getTimeFrame)
    const strategy = yield select(getTransactionsStrategy)
    const params = { start, end, strategy }
    const { result = {}, error } = yield call(getReqTaxTransactions, params)
    yield put(actions.updateTaxReportTransactions(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'taxreport.sections.transactions',
        detail: error?.message ?? JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'taxreport.sections.transactions',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchTaxReportFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* taxReportSaga() {
  yield takeLatest(types.FETCH_TAX_REPORT, fetchTaxReport)
  yield takeLatest(types.FETCH_SNAPSHOT, fetchTaxReportSnapshot)
  yield takeLatest(types.REFRESH, refreshTaxReport)
  yield takeLatest(types.FETCH_FAIL, fetchTaxReportFail)
  yield takeLatest([types.FETCH_TRANSACTIONS, types.REFRESH_TRANSACTIONS], fetchTransactions)
}
