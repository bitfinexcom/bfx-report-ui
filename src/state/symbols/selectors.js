const getSymbols = state => state.symbols

export const getCoins = state => getSymbols(state).coins

export default {
  getCoins,
}
