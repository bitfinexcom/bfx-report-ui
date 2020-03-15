import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import {
  formatPair,
  formatRawSymbols,
  isFundingSymbol,
  isTradingPair,
  mapPair,
  mapRequestPairs,
  mapRequestSymbols,
  mapSymbol,
  removePrefix,
} from 'state/symbols/utils'
import { updateErrorStatus } from 'state/status/actions'
import { makeFetchCall } from 'state/utils'

import actions from './actions'
import types from './constants'
import {
  getPublicFundingStartTime,
  getPublicFundingSymbols,
  getPublicTradesPairs,
  getPublicTradesStartTime,
} from './selectors'

const getSyncConfReq = () => makeFetchCall('getAllPublicСollsСonfs')
const editSyncConfReq = params => makeFetchCall('editAllPublicСollsСonfs', params)
const updateSyncErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'sync.title',
  detail: msg,
})

export function* getSyncConf() {
  const { result, error } = yield call(getSyncConfReq)

  if (error) {
    return yield put(updateSyncErrorStatus('during getSyncConf'))
  }

  const {
    tickersHistoryConf,
    publicTradesConf,
    statusMessagesConf,
    candlesConf,
  } = result

  // set default pref for derivatives, enabling view of those pairs in sync mode
  if (!statusMessagesConf.length) {
    yield call(editSyncConfReq, {
      statusMessagesConf: [
        { symbol: 'tBTCF0:USTF0', start: 0 },
        { symbol: 'tETHF0:USTF0', start: 0 },
      ],
    })
  }

  const configs = {
    tickersHistoryConf: tickersHistoryConf.length
      ? {
        pairs: tickersHistoryConf.map(({ symbol }) => mapPair(formatPair(symbol))),
        startTime: tickersHistoryConf[0].start,
      }
      : [],
    candlesConf: candlesConf.length
      ? candlesConf.map(data => ({
        ...data,
        symbol: mapPair(formatPair(data.symbol)),
      }))
      : [],
  }

  // separate public trades (pairs) and public funding (symbols) from publicTradesConf
  const publicTradesPairs = publicTradesConf.filter(data => isTradingPair(data.symbol))
  const publicTradesSymbols = publicTradesConf.filter(data => isFundingSymbol(data.symbol))

  configs.publicTradesConf = publicTradesPairs.length
    ? {
      pairs: publicTradesPairs.map(({ symbol }) => mapPair(formatPair(symbol))),
      startTime: publicTradesPairs[0] && publicTradesPairs[0].start,
    }
    : { pairs: [], startTime: 0 }

  configs.publicFundingConf = publicTradesPairs.length
    ? {
      symbols: publicTradesSymbols.map(({ symbol }) => mapSymbol(removePrefix(symbol))),
      startTime: publicTradesSymbols[0] && publicTradesSymbols[0].start,
    }
    : { pairs: [], startTime: 0 }

  return yield put(actions.editSyncConf(configs))
}

function* editPublicTradesConf({ payload }) {
  const { pairs, startTime } = payload

  const symbols = yield select(getPublicFundingSymbols)
  const publicFundingStartTime = yield select(getPublicFundingStartTime)

  // config for 2 sections is merged in one
  const params = [
    // public trades config
    ...mapRequestPairs(pairs).map(pair => ({
      symbol: formatRawSymbols(pair),
      start: startTime,
    })),
    // public funding config
    ...mapRequestSymbols(symbols).map(symbol => ({
      symbol: formatRawSymbols(symbol),
      start: publicFundingStartTime,
    })),
  ]

  const { error } = yield call(editSyncConfReq, {
    publicTradesConf: params,
  })
  if (error) {
    yield put(updateSyncErrorStatus('during editPublicTradesPairConf'))
  }
}

function* editPublicFundingConf({ payload }) {
  const { symbols, startTime } = payload

  const pairs = yield select(getPublicTradesPairs)
  const publicTradesStartTime = yield select(getPublicTradesStartTime)

  // config for 2 sections is merged in one
  const params = [
    // public trades config
    ...mapRequestPairs(pairs).map(pair => ({
      symbol: formatRawSymbols(pair),
      start: publicTradesStartTime,
    })),
    // public funding config
    ...mapRequestSymbols(symbols).map(symbol => ({
      symbol: formatRawSymbols(symbol),
      start: startTime,
    })),
  ]

  const { error } = yield call(editSyncConfReq, {
    publicTradesConf: params,
  })
  if (error) {
    yield put(updateSyncErrorStatus('during editPublicTradesSymbolConf'))
  }
}

function* editTickersHistoryConf({ payload }) {
  const { pairs = [], startTime } = payload

  const params = {
    tickersHistoryConf: mapRequestPairs(pairs).map(pair => ({
      symbol: formatRawSymbols(pair),
      start: startTime,
    })),
  }

  const { error } = yield call(editSyncConfReq, params)
  if (error) {
    yield put(updateSyncErrorStatus('during editTickersHistoryConf'))
  }
}

function* editCandlesConf({ payload: options }) {
  const params = options.map(option => ({
    start: option.start,
    symbol: formatRawSymbols(mapRequestPairs(option.symbol, true)),
    timeframe: option.timeframe,
  }))

  const { error } = yield call(editSyncConfReq, {
    candlesConf: params,
  })
  if (error) {
    yield put(updateSyncErrorStatus('during editCandlesConf'))
  }
}

export default function* syncConfigSaga() {
  yield takeLatest(types.EDIT_PUBLIC_TRADES_PREF, editPublicTradesConf)
  yield takeLatest(types.EDIT_PUBLIC_FUNDING_PREF, editPublicFundingConf)
  yield takeLatest(types.EDIT_TICKERS_HISTORY_PREF, editTickersHistoryConf)
  yield takeLatest(types.EDIT_CANDLES_PREF, editCandlesConf)
}
