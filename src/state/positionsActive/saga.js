// Return the active positions of a user between two dates
import { call, put, takeLatest } from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'

const getReqPositions = () => makeFetchCall('getActivePositions')

function* fetchActivePositions() {
  try {
    const { result, error } = yield call(getReqPositions)
    yield put(actions.updateAPositions(result))
    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'positions.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'positions.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchPositionsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* positionsActiveSaga() {
  yield takeLatest(types.FETCH_APOSITIONS, fetchActivePositions)
  yield takeLatest(types.FETCH_FAIL, fetchPositionsFail)
}
