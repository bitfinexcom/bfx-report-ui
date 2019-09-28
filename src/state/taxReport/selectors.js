export const getTaxReport = state => state.taxReport

export const getDataReceived = state => getTaxReport(state).dataReceived
export const getParams = (state) => {
  const { start, end } = getTaxReport(state)

  return { start, end }
}
export const getData = (state) => {
  const {
    startingPositionsSnapshot,
    endingPositionsSnapshot,
    finalState,
  } = getTaxReport(state)

  return {
    startingPositionsSnapshot,
    endingPositionsSnapshot,
    finalState,
  }
}

export default {
  getDataReceived,
  getParams,
  getTaxReport,
}
