import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import queryString from 'query-string'
import moment from 'moment-timezone'
import { Classes, Position } from '@blueprintjs/core'
import { DateRangeInput } from '@blueprintjs/datetime'

import baseTypes from 'state/base/constants'
import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'

import { propTypes, defaultProps } from './DateRangePicker.props'

const createShortcut = (label, dateRange) => ({ dateRange, label, includeTime: true })

class DateRangePicker extends PureComponent {
  state = {
    startDate: null,
    endDate: new Date(),
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
    confirm.addEventListener('click', this.startQuery)

    controls.appendChild(cancel)
    controls.appendChild(confirm)

    datePicker.appendChild(controls)
  }

  createShortcuts = () => {
    const { t } = this.props
    const today = new Date()
    const makeDate = (action) => {
      const returnVal = new Date()
      action(returnVal)
      returnVal.setDate(returnVal.getDate() + 1)
      return returnVal
    }

    const pastDay = makeDate(d => d.setDate(d.getDate() - 1))
    const twoWeeksAgo = makeDate(d => d.setDate(d.getDate() - 14))
    const oneMonthAgo = makeDate(d => d.setMonth(d.getMonth() - 1))
    const threeMonthsAgo = makeDate(d => d.setMonth(d.getMonth() - 3))
    const oneYearAgo = makeDate(d => d.setFullYear(d.getFullYear() - 1))
    const twoYearsAgo = makeDate(d => d.setFullYear(d.getFullYear() - 2))

    const currentYearStart = new Date(today.getFullYear(), 0, 1)
    const lastYearStart = new Date(today.getFullYear() - 1, 0, 1)
    const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59)

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
    const { updateWarningStatus } = this.props
    const [startDate, endDate] = range
    this.removePopoverDismiss()
    const sixYearsPast = moment().add({ years: -6 })

    if (sixYearsPast.isAfter(startDate)) {
      updateWarningStatus({
        id: 'status.warn',
        topic: 'timeframe.range_limit',
      })
      return
    }

    if (startDate && endDate) {
      if (moment(startDate).isBefore(endDate)) {
        this.handleRangeChange2(range)
      }
      return
    }

    this.handleRangeChange2(range)
  }

  handleRangeChange2 = (range) => {
    const [startDate, endDate] = range
    this.setState({
      startDate,
      endDate,
    })
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

  startQuery = () => {
    const { startDate, endDate } = this.state
    const { history, setCustomTimeRange } = this.props
    if (startDate !== null && endDate !== null) {
      const start = startDate.getTime()
      const end = endDate.getTime()

      setCustomTimeRange(start, end)

      const { pathname, search } = window.location
      const parsed = queryString.parse(search)
      const { range } = parsed
      const [startStr, endStr] = range ? range.split('-') : [undefined, undefined]
      if (`${start}` !== startStr || `${end}` !== endStr) {
        const params = Object.assign(
          parsed,
          { range: `${start}-${end}` },
        )
        history.replace(`${pathname}?${queryString.stringify(params, { encode: false })}`)
      }
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
    const { t } = this.props
    const { startDate, endDate } = this.getDates()
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, baseTypes.DEFAULT_TIMEZONE)
    const commonDateRangeProps = {
      allowSingleDayRange: true,
      closeOnSelection: false,
      // contiguousCalendarMonths: false,
      formatDate,
      parseDate,
      onChange: this.handleRangeChange,
      defaultValue: [startDate, endDate],
      maxDate: new Date(),
      placeholder: t('timeframe.start-date-placeholder'),
    }

    return (
      <div className='date-range-picker'>
        <DateRangeInput
          {...commonDateRangeProps}
          className='date-range-picker-inputs'
          popoverProps={{
            minimal: true,
            onOpened: this.removePopoverDismiss,
            onOpening: this.addControls,
            position: Position.BOTTOM_LEFT,
            popoverClassName: 'date-range-picker-popover',
            shouldDismissPopover: false,
            targetTagName: 'div',
          }}
          shortcuts={this.createShortcuts()}
        />
      </div>
    )
  }
}

DateRangePicker.propTypes = propTypes
DateRangePicker.defaultProps = defaultProps

export default withTranslation('translations')(DateRangePicker)
