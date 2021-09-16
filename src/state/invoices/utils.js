import _get from 'lodash/get'

import { mapSymbol } from 'state/symbols/utils'

export const updateInvoices = (state, payload) => {
  const res = _get(payload, ['data', 'res'])
  if (!res) {
    return {
      ...state,
      dataReceived: true,
      pageLoading: false,
    }
  }

  const { existingCoins } = state
  const updateCoins = [...existingCoins]
  const entries = res.map((entry) => {
    const {
      amount,
      amountUsd,
      balance,
      balanceUsd,
      currency,
      // description,
      id,
      mts,
      wallet,
    } = entry
    const mappedCurrency = mapSymbol(currency)
    // save new symbol to updateCoins list
    if (updateCoins.indexOf(mappedCurrency) === -1) {
      updateCoins.push(mappedCurrency)
    }
    return {
      id,
      currency: mappedCurrency,
      mts,
      amount,
      amountUsd,
      balance,
      balanceUsd,
      // description: mapDescription(description),
      wallet,
    }
  })

  return {
    ...state,
    dataReceived: true,
    pageLoading: false,
    entries: [...state.entries, ...entries],
    existingCoins: updateCoins.sort(),
  }
}

export default {
  updateInvoices,
}
