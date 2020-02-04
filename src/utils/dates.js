import moment from 'moment'

export const getFormattedDate = time => moment(time).format('MMMM DD, YYYY HH:mm')

export default {
  getFormattedDate,
}
