import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'
 

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { fetchUsers, logout } from 'state/auth/actions'
import { getAuthData, selectAuth } from 'state/auth/selectors'
import Authenticator from 'state/auth/Authenticator'

import types from './constants'

const getReqCreateSubAccount = (params) => {
  console.log('++getReqCreateSubAccount param', params)

  const { subAccountApiKeys } = params

  return makeFetchCall('createSubAccount', {
    subAccountApiKeys,
  })
}

const getReqRemoveSubAccount = (auth) => makeFetchCall('removeUser', null, auth)

const getReqUpdateSubAccount = (params, auth) => {
  const {
    addingSubUsers,
    removingSubUsersByEmails,
  } = params

  console.log('++getReqUpdateSubAccount params', params)
  console.log('++getReqUpdateSubAccount auth', auth)

  return makeFetchCall('updateSubAccount', {
    addingSubUsers,
    removingSubUsersByEmails,
  }, auth)
}

export function* createSubAccount({ payload: subAccounts }) {
  console.log('++createSubAccount subAccounts', subAccounts)
  try {
    const { result, error } = yield call(getReqCreateSubAccount, { subAccountApiKeys: subAccounts })
    console.log('++createSubAccount result', result)
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
    const { email } = yield select(getAuthData)
    const auth = yield select(selectAuth)

    console.log('++removeSubAccount email', email)
    console.log('++removeSubAccount auth', auth)

    const { result, error } = yield call(getReqRemoveSubAccount, auth)
    if (result) {
      Authenticator.clear()
      yield put({
        type: types.REMOVE_SUCCESS,
        payload: email,
      })
      yield put(logout())
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

export function* updateSubAccount({ payload }) {
  try {
    const { addedSubUsers, removedSubUsers, masterAccount } = payload

    console.log('++updateSubAccount masterAccount', masterAccount)

    let auth
    if (masterAccount) {
      auth = {
        email: masterAccount,
        isSubAccount: true,
      }
    }else {
      auth = yield select(selectAuth)
    }



    console.log('++updateSubAccount addedSubUsers', addedSubUsers)
    console.log('++updateSubAccount removedSubUsers', removedSubUsers)


    // const auth = {
    //   email: 'zequipro@protonmail.com',
    //   isSubAccount: true,
    // }

    console.log('++updateSubAccount auth', auth)

    const params = {}
    if (addedSubUsers.length) {
      params.addingSubUsers = addedSubUsers
    }
    if (removedSubUsers.length) {
      params.removingSubUsersByEmails = removedSubUsers.map(subUserEmail => ({ email: subUserEmail }))
    }
    const { result, error } = yield call(getReqUpdateSubAccount, params, auth)
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

export default function* subAccountsSaga() {
  yield takeLatest(types.ADD, createSubAccount)
  yield takeLatest(types.REMOVE, removeSubAccount)
  yield takeLatest(types.UPDATE, updateSubAccount)
}
