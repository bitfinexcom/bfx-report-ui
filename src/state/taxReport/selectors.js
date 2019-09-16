export const getTaxReport = state => state.taxReport

export const getDataReceived = state => getTaxReport(state).dataReceived
export const getParams = (state) => {
  const { start, end } = getTaxReport(state)

  return { start, end }
}
export const getData = (state) => {
  const {
    depositsTotalAmount,
    endPositionsSnapshot,
    endTickers,
    movementsEntries,
    movementsTotalAmount,
    startPositionsSnapshot,
    startTickers,
    winLossTotalAmount,
    withdrawalsTotalAmount,
  } = getTaxReport(state)

  return {
    depositsTotalAmount,
    endPositionsSnapshot,
    endTickers,
    movementsEntries,
    movementsTotalAmount,
    startPositionsSnapshot,
    startTickers,
    winLossTotalAmount,
    withdrawalsTotalAmount,
  }
}

export default {
  getDataReceived,
  getParams,
  getTaxReport,
}
