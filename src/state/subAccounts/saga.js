import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { fetchUsers, logout } from 'state/auth/actions'
import { getAuthData } from 'state/auth/selectors'

import types from './constants'

const getReqCreateSubAccount = (params) => {
  const { subAccountApiKeys } = params

  return makeFetchCall('createSubAccount', {
    subAccountApiKeys,
  })
}

const getReqRemoveSubAccount = (auth) => makeFetchCall('removeUser', null, auth)

export function* createSubAccount({ payload: subAccounts }) {
  try {
    const { result, error } = yield call(getReqCreateSubAccount, { subAccountApiKeys: subAccounts })
    if (result) {
      yield put(fetchUsers())
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
  yield takeLatest(types.ADD, createSubAccount)
  yield takeLatest(types.REMOVE, removeSubAccount)
}
