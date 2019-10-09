export const getTaxReport = state => state.taxReport
export const getStartSnapshot = state => getTaxReport(state).startSnapshot
export const getEndSnapshot = state => getTaxReport(state).endSnapshot

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
export const getSnapshot = (state, section) => {
  if (section === 'start_snapshot') {
    return getStartSnapshot(state)
  }
  return getEndSnapshot(state)
}
export const getSnapshotDataReceived = (state, section) => {
  if (section === 'start_snapshot') {
    return getStartSnapshot(state).dataReceived
  }
  return getEndSnapshot(state).dataReceived
}

export default {
  getDataReceived,
  getParams,
  getTaxReport,
  getSnapshot,
  getSnapshotDataReceived,
}
