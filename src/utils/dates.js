import moment from 'moment'

export const getFormattedDate = time => moment(time).format('MMMM DD, YYYY HH:mm')

export const makeDate = (action) => {
  const returnVal = new Date()
  action(returnVal)
  return returnVal.getTime()
}

export default {
  getFormattedDate,
  makeDate,
}
