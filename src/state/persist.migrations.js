const migrations = {
  0: state => ({
    ...state,
    base: {
      ...state.base,
      isSyncEnabled: (state.base.isSyncEnabled === undefined)
        ? true
        : state.base.isSyncEnabled,
    },
  }),
}

export default migrations
