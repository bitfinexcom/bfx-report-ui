const getSymbols = state => state.symbols

export const getCoins = state => getSymbols(state).coins
export const getPairs = state => getSymbols(state).pairs

export default {
  getCoins,
  getPairs,
}
