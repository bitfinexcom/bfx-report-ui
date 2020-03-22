import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import moment from 'moment-timezone'
import {
  Button,
  Classes,
  Intent,
} from '@blueprintjs/core'
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
    const { setCustomTimeRange } = this.props
    if (startDate !== null && endDate !== null) {
      setCustomTimeRange(startDate.getTime(), endDate.getTime())
    }
  }

  render() {
    const { t } = this.props
    const { startDate, endDate } = this.getDates()
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, baseTypes.DEFAULT_TIMEZONE)
    const commonDateRangeProps = {
      allowSingleDayRange: true,
      closeOnSelection: true,
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
            targetTagName: 'div',
          }}
          shortcuts={this.createShortcuts()}
        />

        <Button
          intent={Intent.PRIMARY}
          onClick={this.startQuery}
          className={Classes.POPOVER_DISMISS}
          disabled={!startDate || !endDate}
        >
          {t('timeframe.custom.view')}
        </Button>
      </div>
    )
  }
}

DateRangePicker.propTypes = propTypes
DateRangePicker.defaultProps = defaultProps

export default withTranslation('translations')(DateRangePicker)
