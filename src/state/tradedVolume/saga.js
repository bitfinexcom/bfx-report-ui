import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { toggleErrorDialog } from 'state/ui/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getParams } from 'state/tradedVolume/selectors'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'
import { getTimeFrame } from 'state/timeRange/selectors'

import types from './constants'
import actions from './actions'

export const getTradedVolume = ({
  start,
  end,
  timeframe,
  targetPairs,
}) => {
  const params = { start, end, timeframe }
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }
  return makeFetchCall('getTradedVolume', params)
}

/* eslint-disable-next-line consistent-return */
export function* fetchTradedVolume() {
  try {
    const { timeframe, targetPairs } = yield select(getParams)
    const { start, end } = yield select(getTimeFrame)

    const { result = [], error } = yield call(getTradedVolume, {
      start,
      end,
      timeframe,
      targetPairs,
    })
    yield put(actions.updateTradedVolume(result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'tradedvolume.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshTradedVolume() {
  yield put(actions.fetchTradedVolume())
}

function* fetchTradedVolumeFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* tradedVolumeSaga() {
  yield takeLatest(types.FETCH_TRADED_VOLUME, fetchTradedVolume)
  yield takeLatest([types.REFRESH, types.CLEAR_SYMBOLS], refreshTradedVolume)
  yield takeLatest(types.FETCH_FAIL, fetchTradedVolumeFail)
}
