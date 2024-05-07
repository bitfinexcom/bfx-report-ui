import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { getTimeFrame } from 'state/timeRange/selectors'

import types from './constants'
import actions from './actions'
import { getTransactionsStrategy } from './selectors'

// const transctionsResult = [
//   {
//     asset: 'LTC',
//     amount: 1.43796106,
//     mtsAcquired: 1712042016000,
//     mtsSold: 1712042359302,
//     proceeds: 142.64861307412,
//     cost: 142.41853930451998,
//     gainOrLoss: -0.23007376960001125,
//   },
//   {
//     asset: 'BTC',
//     amount: 0.001342,
//     mtsAcquired: 1649771737942,
//     mtsSold: 1709584808125,
//     proceeds: 90.838638,
//     cost: 54.303808778059306,
//     gainOrLoss: 36.5348292219407,
//   },
//   {
//     asset: 'LTC',
//     amount: 1e-8,
//     mtsAcquired: 1706858241000,
//     mtsSold: 1706861968714,
//     proceeds: 6.7707e-7,
//     cost: 6.7876e-7,
//     gainOrLoss: -1.6900000000000634,
//   },
// ]

export const getReqTaxReport = (params) => makeFetchCall('makeTrxTaxReportInBackground', params)

export function* fetchTaxReport() {
  // yield put(actions.updateTaxReportTransactions(transctionsResult))
  try {
    const { start, end } = yield select(getTimeFrame)
    const strategy = yield select(getTransactionsStrategy)
    const params = { start, end, strategy }
    const { result = {}, error } = yield call(getReqTaxReport, params)
    console.log('++result', result)
    // yield put(actions.updateTaxReportTransactions(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'taxreport.title',
        detail: error?.message ?? JSON.stringify(error),
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

function* fetchTaxReportFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

function* handleTaxTrxReportGenerationCompleted({ payload }) {
  const { result, error } = payload
  console.log('+++WS result', result)
  if (result) {
    yield put(actions.updateTaxReportTransactions(result))
  }
  if (error) {
    yield put(actions.fetchFail({
      id: 'status.fail',
      topic: 'taxreport.title',
      detail: error?.message ?? JSON.stringify(error),
    }))
  }
}

export default function* taxReportSaga() {
  yield takeLatest(types.FETCH_FAIL, fetchTaxReportFail)
  yield takeLatest([types.FETCH_TRANSACTIONS, types.REFRESH_TRANSACTIONS], fetchTaxReport)
  yield takeLatest(types.WS_TAX_TRANSACTION_REPORT_GENERATION_COMPLETED, handleTaxTrxReportGenerationCompleted)
}
