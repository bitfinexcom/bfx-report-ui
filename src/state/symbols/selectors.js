const getSymbols = state => state.symbols

export const getSymbolsFetchStatus = state => getSymbols(state).isFetched
export const getCoins = state => getSymbols(state).coins
export const getCurrencies = state => getSymbols(state).currencies
export const getExplorers = state => getSymbols(state).explorers || {}
export const getPairs = state => getSymbols(state).pairs

export default {
  getSymbolsFetchStatus,
  getCoins,
  getCurrencies,
  getExplorers,
  getPairs,
}
