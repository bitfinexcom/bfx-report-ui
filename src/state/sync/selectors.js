const getSync = state => state.sync

export const getSyncMode = state => getSync(state).syncMode

export default {
  getSyncMode,
}
