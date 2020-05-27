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
  1: state => ({
    ...state,
    base: {
      ...state.base,
      apiKey: undefined,
      apiSecret: undefined,
      authToken: undefined,
    },
  }),
}

export default migrations
