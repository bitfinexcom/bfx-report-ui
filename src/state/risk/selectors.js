export const getRisk = state => state.risk

export const getDataReceived = state => getRisk(state).dataReceived
export const getEntries = state => getRisk(state).entries
export const getParams = (state) => {
  const {
    start,
    end,
    timeframe,
  } = getRisk(state)
  return {
    start,
    end,
    timeframe,
  }
}

export default {
  getDataReceived,
  getEntries,
  getParams,
  getRisk,
}
