import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { logout } from 'state/auth/actions'
import { getAuthData } from 'state/auth/selectors'

import types from './constants'
import actions, { setSubAccounts } from './actions'

const getReqFetchSubAccounts = (auth) => makeFetchCall('verifyUser', null, { ...auth, isSubAccount: true })

const getReqCreateSubAccount = (params) => {
  const { subAccountApiKeys } = params

  return makeFetchCall('createSubAccount', {
    subAccountApiKeys,
  })
}

const getReqRemoveSubAccount = (auth) => makeFetchCall('removeUser', null, auth)

export function* fetchSubAccounts({ payload: auth }) {
  try {
    const { result, error } = yield call(getReqFetchSubAccounts, auth)
    yield put(setSubAccounts(result))

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'subaccounts.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'subaccounts.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export function* createSubAccount({ payload: subAccounts }) {
  try {
    const { result, error } = yield call(getReqCreateSubAccount, { subAccountApiKeys: subAccounts })
    if (result) {
      yield put({
        type: types.ADD_SUCCESS,
        payload: result,
      })
      // TODO: get sub users data from server on sub account creation
      const { email, password } = yield select(getAuthData)
      yield put(actions.fetchSubAccounts({ email, password }))
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'subaccounts.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'subaccounts.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export function* removeSubAccount() {
  try {
    const { email, password, isSubAccount } = yield select(getAuthData)
    const { result, error } = yield call(getReqRemoveSubAccount, {
      email,
      password,
      isSubAccount: true,
    })
    if (result) {
      yield put({
        type: types.REMOVE_SUCCESS,
        payload: email,
      })
      if (isSubAccount) {
        yield put(logout())
      }
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'subaccounts.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'subaccounts.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export default function* subAccountsSaga() {
  yield takeLatest(types.FETCH, fetchSubAccounts)
  yield takeLatest(types.ADD, createSubAccount)
  yield takeLatest(types.REMOVE, removeSubAccount)
}
