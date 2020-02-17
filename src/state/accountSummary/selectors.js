export const getAccountSummary = state => state.accountSummary

export const getData = state => getAccountSummary(state).data
export const getDataReceived = state => getAccountSummary(state).dataReceived
export const getPageLoading = state => getAccountSummary(state).pageLoading

export default {
  getDataReceived,
  getData,
  getPageLoading,
}
