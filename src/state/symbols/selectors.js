const getSymbols = state => state.symbols

export const getCoins = state => getSymbols(state).coins
export const getCurrencies = state => getSymbols(state).currencies
export const getPairs = state => getSymbols(state).pairs

export default {
  getCoins,
  getCurrencies,
  getPairs,
}
