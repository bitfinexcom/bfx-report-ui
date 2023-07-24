import moment from 'moment'
import _join from 'lodash/join'
import _floor from 'lodash/floor'
import _toString from 'lodash/toString'
import _padStart from 'lodash/padStart'

export const getFormattedDate = time => moment(time).format('MMMM DD, YYYY HH:mm')

export const makeDate = (action) => {
  const returnVal = new Date()
  action(returnVal)
  return returnVal.getTime()
}

export const getFormattedTime = (time, format) => moment(time).format(format)

export const getFormattedDuration = (milliseconds) => {
  const seconds = _floor((milliseconds / 1000) % 60)
  const minutes = _floor((milliseconds / 1000 / 60) % 60)
  const hours = _floor((milliseconds / 1000 / 60 / 60) % 24)

  return _join([
    _padStart(_toString(hours), 2, '0'),
    _padStart(_toString(minutes), 2, '0'),
    _padStart(_toString(seconds), 2, '0'),
  ], ':')
}

export default {
  getFormattedDate,
  getFormattedTime,
  getFormattedDuration,
  makeDate,
}
