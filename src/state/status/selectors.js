const getStatus = state => state.status

export const getIntent = state => getStatus(state).intent
export const getMsg = state => getStatus(state).msg

export default {
  getIntent,
  getMsg,
}
