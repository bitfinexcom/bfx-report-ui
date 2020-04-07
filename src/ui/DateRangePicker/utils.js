import timeRangeTypes from 'state/timeRange/constants'

const {
  LAST_24HOURS,
  LAST_2WEEKS,
  PAST_MONTH,
  PAST_3MONTH,
  PAST_YEAR,
  PAST_2YEARS,
  CURRENT_YEAR,
  LAST_YEAR,
  CUSTOM,
} = timeRangeTypes

export const getSelectedShortcutIndex = ({ range, shortcutsMap }) => {
  const [startDate, endDate] = range

  return shortcutsMap.findIndex((shortcut) => {
    const [start, end] = shortcut
    return (start === startDate && end === endDate)
  })
}

export const getShortcutIndex = (range) => {
  switch (range) {
    case LAST_24HOURS:
      return 0
    case LAST_2WEEKS:
      return 1
    case PAST_MONTH:
      return 2
    case PAST_3MONTH:
      return 3
    case PAST_YEAR:
      return 4
    case PAST_2YEARS:
      return 5
    case CURRENT_YEAR:
      return 6
    case LAST_YEAR:
      return 7
    case CUSTOM:
    default:
      return -1
  }
}

export const getShortcutTimeRange = (shortcutIndex) => {
  switch (shortcutIndex) {
    case 0:
      return LAST_24HOURS
    case 1:
      return LAST_2WEEKS
    case 2:
      return PAST_MONTH
    case 3:
      return PAST_3MONTH
    case 4:
      return PAST_YEAR
    case 5:
      return PAST_2YEARS
    case 6:
      return CURRENT_YEAR
    case 7:
      return LAST_YEAR
    case -1:
    default:
      return CUSTOM
  }
}

export default {
  getSelectedShortcutIndex,
  getShortcutIndex,
  getShortcutTimeRange,
}
