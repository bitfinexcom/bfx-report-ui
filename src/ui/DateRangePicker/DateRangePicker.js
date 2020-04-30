import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import queryString from 'query-string'
import moment from 'moment-timezone'
import { Classes, Popover } from '@blueprintjs/core'
import { DateRangePicker as BlueprintDateRangePicker } from '@blueprintjs/datetime'

import baseTypes from 'state/base/constants'
import timeRangeTypes from 'state/timeRange/constants'
import { getTimeFrameFromData } from 'state/timeRange/selectors'
import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'

import { propTypes, defaultProps } from './DateRangePicker.props'
import {
  getSelectedShortcutIndex,
  getShortcutIndex,
  getShortcutTimeRange,
} from './utils'

const createShortcut = (label, dateRange) => ({ dateRange, label, includeTime: true })

const makeDate = (action) => {
  const returnVal = new Date()
  action(returnVal)
  return returnVal
}

class DateRangePicker extends PureComponent {
  constructor(props) {
    super()

    const { range, start, end } = props

    const date = new Date()
    date.setFullYear(date.getFullYear() - 6)
    this.sixYearsBefore = date

    const { start: timeFrameStart, end: timeFrameEnd } = getTimeFrameFromData({ range, start, end })
    this.state = {
      startDate: timeFrameStart && new Date(timeFrameStart),
      endDate: timeFrameEnd && new Date(timeFrameEnd),
      shortcutIndex: getShortcutIndex(range),
    }
  }

  addControls = () => {
    const { t } = this.props

    const datePicker = document.querySelector('.bp3-daterangepicker')
    const controls = document.createElement('div')
    controls.classList.add('date-range-picker-controls')

    const cancel = document.createElement('button')
    cancel.classList.add('bp3-button', Classes.POPOVER_DISMISS)
    cancel.innerHTML = t('timeframe.custom.cancel')

    const confirm = document.createElement('button')
    confirm.classList.add('bp3-button', 'bp3-intent-primary', Classes.POPOVER_DISMISS)
    confirm.innerHTML = t('timeframe.custom.confirm')
    confirm.addEventListener('click', this.onApply)

    controls.appendChild(cancel)
    controls.appendChild(confirm)

    datePicker.appendChild(controls)
  }

  createShortcuts = () => {
    const { t } = this.props
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

    this.shortcutsMap = [
      [pastDay, today],
      [twoWeeksAgo, today],
      [oneMonthAgo, today],
      [threeMonthsAgo, today],
      [oneYearAgo, today],
      [twoYearsAgo, today],
      [currentYearStart, today],
      [lastYearStart, lastYearEnd],
    ]

    return [
      createShortcut(t('timeframe.24h'), [pastDay, today]),
      createShortcut(t('timeframe.2w'), [twoWeeksAgo, today]),
      createShortcut(t('timeframe.past_month'), [oneMonthAgo, today]),
      createShortcut(t('timeframe.past_3m'), [threeMonthsAgo, today]),
      createShortcut(t('timeframe.past_year'), [oneYearAgo, today]),
      createShortcut(t('timeframe.past_2y'), [twoYearsAgo, today]),
      createShortcut(t('timeframe.custom_year', { year: today.getFullYear() }), [currentYearStart, today]),
      createShortcut(t('timeframe.custom_year', { year: today.getFullYear() - 1 }), [lastYearStart, lastYearEnd]),
    ]
  }

  handleRangeChange = (range) => {
    const [startDate, endDate] = range
    this.removePopoverDismiss()
    const shortcutIndex = getSelectedShortcutIndex({ range, shortcutsMap: this.shortcutsMap })

    if (startDate && endDate && !moment(startDate).isBefore(endDate)) {
      return
    }

    this.setState({
      startDate,
      endDate,
      shortcutIndex,
    })
  }

  // workaround for not being able to set selected shortcut, `selectedShortcutIndex` doesn't work
  // sets active classes on a currently selected shortcut and removes them on shortcut click
  highlightSelectedShortcut = () => {
    const { range } = this.props
    const shortcutIndex = getShortcutIndex(range)

    if (shortcutIndex === -1) {
      return
    }

    const shortcuts = document.querySelectorAll('.bp3-daterangepicker-shortcuts li .bp3-menu-item')
    const shortcut = shortcuts[shortcutIndex]
    shortcut.classList.add('bp3-active', 'bp3-intent-primary')

    const shortcutsContainer = document.getElementsByClassName('bp3-daterangepicker-shortcuts')[0]
    this.removeShortcutHighlight = () => {
      shortcut.classList.remove('bp3-active', 'bp3-intent-primary')
      shortcutsContainer.removeEventListener('click', this.removeShortcutHighlight)
    }
    shortcutsContainer.addEventListener('click', this.removeShortcutHighlight)
  }

  getDates = () => {
    const { startDate, endDate } = this.state

    let formattedEndDate = endDate

    if (endDate && moment().isBefore(endDate)) {
      formattedEndDate = null
    }

    return {
      startDate,
      endDate: formattedEndDate,
    }
  }

  onApply = () => {
    const { startDate, endDate, shortcutIndex } = this.state
    const { history, setTimeRange, updateSuccessStatus } = this.props
    if (startDate !== null && endDate !== null) {
      const start = startDate.getTime()
      const end = endDate.getTime()
      const timeRange = getShortcutTimeRange(shortcutIndex)

      setTimeRange({
        range: timeRange,
        start,
        end,
      })

      const { pathname, search } = window.location
      const parsed = queryString.parse(search)
      const { range } = parsed
      const [startStr, endStr] = range ? range.split('-') : [undefined, undefined]
      if (`${start}` !== startStr || `${end}` !== endStr) {
        const nextRange = timeRange === timeRangeTypes.CUSTOM
          ? `${start}-${end}`
          : undefined
        const params = Object.assign(
          parsed,
          { range: nextRange },
        )
        history.replace(`${pathname}?${queryString.stringify(params, { encode: false })}`)
      }
      updateSuccessStatus({ id: 'status.timeframe_update' })
    }
  }

  // workaround for popover dismiss https://github.com/palantir/blueprint/issues/3338
  removePopoverDismiss = () => {
    const shortcuts = document.querySelectorAll('.bp3-daterangepicker-shortcuts li .bp3-menu-item')
    if (!shortcuts.length) {
      return
    }

    shortcuts.forEach((shortcut) => {
      shortcut.classList.remove('bp3-popover-dismiss')
    })
  }

  render() {
    const { children, t } = this.props
    const { startDate, endDate } = this.getDates()
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, baseTypes.DEFAULT_TIMEZONE)
    const commonDateRangeProps = {
      allowSingleDayRange: true,
      closeOnSelection: false,
      contiguousCalendarMonths: false,
      formatDate,
      parseDate,
      onChange: this.handleRangeChange,
      defaultValue: [startDate, endDate],
      minDate: this.sixYearsBefore,
      maxDate: new Date(),
      placeholder: t('timeframe.start-date-placeholder'),
    }

    return (
      <Popover
        content={(
          <BlueprintDateRangePicker
            {...commonDateRangeProps}
            shortcuts={this.createShortcuts()}
          />
        )}
        hasBackdrop
        onOpened={this.removePopoverDismiss}
        onOpening={() => {
          this.addControls()
          this.highlightSelectedShortcut()
        }}
        popoverClassName='date-range-picker-popover'
        transitionDuration={0}
      >
        {children}
      </Popover>
    )
  }
}

DateRangePicker.propTypes = propTypes
DateRangePicker.defaultProps = defaultProps

export default withTranslation('translations')(DateRangePicker)
