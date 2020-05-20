import timeRangeTypes from 'state/timeRange/constants'
import { Classes } from '@blueprintjs/core'

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

const createShortcut = (label, dateRange) => ({ dateRange, label, includeTime: true })

const makeDate = (action) => {
  const returnVal = new Date()
  action(returnVal)
  return returnVal
}

export const addControls = ({ onApply, t }) => {
  const datePicker = document.querySelector('.bp3-daterangepicker')
  const controls = document.createElement('div')
  controls.classList.add('date-range-picker-controls')

  const cancel = document.createElement('button')
  cancel.classList.add('bp3-button', Classes.POPOVER_DISMISS)
  cancel.innerHTML = t('timeframe.custom.cancel')

  const confirm = document.createElement('button')
  confirm.classList.add('bp3-button', 'bp3-intent-primary', Classes.POPOVER_DISMISS)
  confirm.innerHTML = t('timeframe.custom.confirm')
  confirm.addEventListener('click', onApply)

  controls.appendChild(cancel)
  controls.appendChild(confirm)

  datePicker.appendChild(controls)
}

export const createShortcuts = ({ t }) => {
  const today = new Date()

  const pastDay = makeDate(d => d.setDate(d.getDate() - 1))
  const twoWeeksAgo = makeDate(d => d.setDate(d.getDate() - 14))
  const oneMonthAgo = makeDate(d => d.setMonth(d.getMonth() - 1))
  const threeMonthsAgo = makeDate(d => d.setMonth(d.getMonth() - 3))
  const oneYearAgo = makeDate(d => d.setFullYear(d.getFullYear() - 1))
  const twoYearsAgo = makeDate(d => d.setFullYear(d.getFullYear() - 2))

  const currentYearStart = new Date(today.getFullYear(), 0, 1)
  const lastYearStart = new Date(today.getFullYear() - 1, 0, 1)
  const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59)

  return {
    shortcuts: [
      createShortcut(t('timeframe.24h'), [pastDay, today]),
      createShortcut(t('timeframe.2w'), [twoWeeksAgo, today]),
      createShortcut(t('timeframe.past_month'), [oneMonthAgo, today]),
      createShortcut(t('timeframe.past_3m'), [threeMonthsAgo, today]),
      createShortcut(t('timeframe.past_year'), [oneYearAgo, today]),
      createShortcut(t('timeframe.past_2y'), [twoYearsAgo, today]),
      createShortcut(t('timeframe.custom_year', { year: today.getFullYear() }), [currentYearStart, today]),
      createShortcut(t('timeframe.custom_year', { year: today.getFullYear() - 1 }), [lastYearStart, lastYearEnd]),
    ],
    shortcutsMap: [
      [pastDay, today],
      [twoWeeksAgo, today],
      [oneMonthAgo, today],
      [threeMonthsAgo, today],
      [oneYearAgo, today],
      [twoYearsAgo, today],
      [currentYearStart, today],
      [lastYearStart, lastYearEnd],
    ],
  }
}

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

// workaround for not being able to set selected shortcut, `selectedShortcutIndex` doesn't work
// sets active classes on a currently selected shortcut and removes them on shortcut click
export const highlightSelectedShortcut = ({ range }) => {
  const shortcutIndex = getShortcutIndex(range)

  if (shortcutIndex === -1) {
    return
  }

  const shortcuts = document.querySelectorAll('.bp3-daterangepicker-shortcuts li .bp3-menu-item')
  const shortcut = shortcuts[shortcutIndex]
  shortcut.classList.add('bp3-active', 'bp3-intent-primary')

  const shortcutsContainer = document.getElementsByClassName('bp3-daterangepicker-shortcuts')[0]
  const removeShortcutHighlight = () => {
    shortcut.classList.remove('bp3-active', 'bp3-intent-primary')
    shortcutsContainer.removeEventListener('click', removeShortcutHighlight)
  }
  shortcutsContainer.addEventListener('click', removeShortcutHighlight)
}

// workaround for popover dismiss https://github.com/palantir/blueprint/issues/3338
export const removePopoverDismiss = () => {
  const shortcuts = document.querySelectorAll('.bp3-daterangepicker-shortcuts li .bp3-menu-item')
  if (!shortcuts.length) {
    return
  }

  shortcuts.forEach((shortcut) => {
    shortcut.classList.remove('bp3-popover-dismiss')
  })
}

export default {
  addControls,
  createShortcuts,
  getSelectedShortcutIndex,
  getShortcutIndex,
  getShortcutTimeRange,
  highlightSelectedShortcut,
  removePopoverDismiss,
}
