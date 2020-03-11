import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'

const getReqAddSubAccount = (params) => {
  const { subAccountApiKeys } = params

  return makeFetchCall('createSubAccount', {
    subAccountApiKeys,
  })
}

const getReqRemoveSubAccount = (params) => {
  const { subAccountApiKeys } = params
  return makeFetchCall('removeSubAccount', subAccountApiKeys)
}

export function* addSubAccount({ payload: subAccounts }) {
  try {
    yield call(getReqAddSubAccount, { subAccountApiKeys: subAccounts })
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'candles.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export function* removeSubAccount({ payload: subAccounts }) {
  try {
    yield call(getReqRemoveSubAccount, { subAccountApiKeys: subAccounts })
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'candles.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchCandlesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* subAccountsSaga() {
  yield takeLatest(types.FETCH, addSubAccount)
  yield takeLatest(types.REFRESH, removeSubAccount)
}
