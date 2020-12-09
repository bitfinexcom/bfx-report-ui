const getSymbols = state => state.symbols

export const getCoins = state => getSymbols(state).coins
export const getCurrencies = state => getSymbols(state).currencies
export const getExplorers = state => getSymbols(state).explorers
export const getInactiveCurrencies = state => getSymbols(state).inactiveCurrencies
export const getInactivePairs = state => getSymbols(state).inactivePairs
export const getPairs = state => getSymbols(state).pairs
export const getSymbolsFetchStatus = state => getSymbols(state).isFetched

export default {
  getCoins,
  getCurrencies,
  getExplorers,
  getInactiveCurrencies,
  getInactivePairs,
  getPairs,
  getSymbolsFetchStatus,
}
