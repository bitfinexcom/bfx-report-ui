// Return the active positions of a user between two dates
import { call, put, takeLatest } from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'

const getReqPositions = () => makeFetchCall('getActivePositions')

const resMock = [
  {
    symbol: 'tBTCF0:USTF0',
    status: 'ACTIVE',
    amount: -0.00315,
    basePrice: 56154,
    marginFunding: 0,
    marginFundingType: 0,
    pl: null,
    plPerc: null,
    liquidationPrice: null,
    leverage: null,
    id: 1806951613,
    mtsCreate: 1725551525000,
    mtsUpdate: 1725552006000,
    type: 1,
    collateral: 1.95070706,
    collateralMin: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    symbol: 'tBTCUST',
    status: 'ACTIVE',
    amount: 0.00315,
    basePrice: 57088,
    marginFunding: 0,
    marginFundingType: 0,
    pl: null,
    plPerc: null,
    liquidationPrice: null,
    leverage: null,
    id: 1789887824,
    mtsCreate: 1723017162000,
    mtsUpdate: 1723017162000,
    type: 0,
    collateral: 0,
    collateralMin: null,
    meta: {
      reason: 'TRADE',
      order_id: 166551946955,
      liq_stage: null,
      order_cid: 1722515845884,
      order_gid: null,
      trade_price: '57088.0',
      trade_amount: '0.00315',
      order_id_oppo: 166742403314,
    },
    _isDataFromApiV2: true,
  },
  {
    symbol: 'tETHF0:USTF0',
    status: 'ACTIVE',
    amount: -0.02499,
    basePrice: 3751.7,
    marginFunding: 0.00021719,
    marginFundingType: 0,
    pl: null,
    plPerc: null,
    liquidationPrice: null,
    leverage: null,
    id: 1746559759,
    mtsCreate: 1716364328000,
    mtsUpdate: 1716364328000,
    type: 1,
    collateral: 2.07461869,
    collateralMin: null,
    meta: {
      pair: 'ETHF0:USTF0',
      amount: -0.0088253768964,
      reason: 'FEE_SETTLE',
      currency: 'USTF0',
      description: 'Trading fees for 0.02499 ETHF0 (ETHF0:USTF0) @ 3751.7 on BFX (0.01%)',
      wallet_type: 'trading',
    },
    _isDataFromApiV2: true,
  },
  {
    symbol: 'tETHUST',
    status: 'ACTIVE',
    amount: 0.025,
    basePrice: 3750.5,
    marginFunding: 0,
    marginFundingType: 0,
    pl: null,
    plPerc: null,
    liquidationPrice: null,
    leverage: null,
    id: 1746559968,
    mtsCreate: 1716364336000,
    mtsUpdate: 1716364369000,
    type: 0,
    collateral: 0,
    collateralMin: null,
    meta: {
      reason: 'TRADE',
      order_id: 154651098380,
      liq_stage: null,
      order_cid: 1716363130737,
      order_gid: null,
      trade_price: '3750.5',
      trade_amount: '0.0092',
      order_id_oppo: 154651131628,
    },
    _isDataFromApiV2: true,
  },
]

function* fetchActivePositions() {
  try {
    const { result, error } = yield call(getReqPositions)
    console.log('+++result', result)
    yield put(actions.updateAPositions(resMock))
    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'positions.title',
        detail: error?.message ?? JSON.stringify(error),
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
