export const getGoToRange = state => state.goToRange
export const getIsGoToRangePreserved = state => getGoToRange(state).isGoToRangePreserved

export default {
  getGoToRange,
  getIsGoToRangePreserved,
}
