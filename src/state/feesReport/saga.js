import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'

import { makeFetchCall } from 'state/utils'
import { toggleErrorDialog } from 'state/ui/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getParams } from 'state/feesReport/selectors'
import { mapRequestSymbols } from 'state/symbols/utils'
import { getTimeFrame } from 'state/timeRange/selectors'

import types from './constants'
import actions from './actions'

export const getFeesReport = ({
  start,
  end,
  timeframe,
  targetSymbols,
  isTradingFees,
  isFundingFees,
}) => {
  const params = {
    start,
    end,
    timeframe,
    isTradingFees,
    isFundingFees,
    symbol: !_isEmpty(targetSymbols)
      ? mapRequestSymbols(targetSymbols)
      : undefined,
  }
  return makeFetchCall('getTotalFeesReport', params)
}

/* eslint-disable-next-line consistent-return */
export function* fetchFeesReport() {
  try {
    const {
      timeframe,
      targetSymbols,
      isTradingFees,
      isFundingFees,
    } = yield select(getParams)
    const { start, end } = yield select(getTimeFrame)
    const { result = [], error } = yield call(getFeesReport, {
      start,
      end,
      timeframe,
      targetSymbols,
      isTradingFees,
      isFundingFees,
    })
    yield put(actions.updateFeesReport(result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'feesreport.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshFeesReport() {
  yield put(actions.fetchFeesReport())
}

function* fetchFeesReportFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* feesReportSaga() {
  yield takeLatest(types.FETCH_FAIL, fetchFeesReportFail)
  yield takeLatest(types.FETCH_FEES_REPORT, fetchFeesReport)
  yield takeLatest([types.REFRESH, types.SET_PARAMS, types.CLEAR_SYMBOLS], refreshFeesReport)
}
