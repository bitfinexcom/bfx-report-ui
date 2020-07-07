import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import queryString from 'query-string'
import classNames from 'classnames'
import moment from 'moment-timezone'
import { Popover } from '@blueprintjs/core'
import { DateRangePicker as BlueprintDateRangePicker, TimePrecision } from '@blueprintjs/datetime'

import timeRangeTypes from 'state/timeRange/constants'
import { getTimeFrameFromData } from 'state/timeRange/selectors'
import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'

import { propTypes, defaultProps } from './DateRangePicker.props'
import {
  addControls,
  createShortcuts,
  getSelectedShortcutIndex,
  getShortcutIndex,
  getShortcutTimeRange,
  highlightSelectedShortcut,
  removePopoverDismiss,
} from './utils'

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

  handleRangeChange = (range) => {
    const [startDate, endDate] = range
    removePopoverDismiss()
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

  onClose = () => {
    const { controlledFromRedux, onClose, toggleTimeFrameDialog } = this.props
    if (controlledFromRedux) {
      toggleTimeFrameDialog(false)
      return
    }
    if (onClose) {
      onClose()
    }
  }

  render() {
    const {
      className,
      children,
      inputTimezone,
      isOpen,
      range,
      t,
    } = this.props
    const { startDate, endDate } = this.getDates()
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, inputTimezone)
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
      timePrecision: TimePrecision.SECOND,
    }
    const popoverClassName = classNames('date-range-picker-popover', className)
    const { shortcuts, shortcutsMap } = createShortcuts({ t })
    this.shortcutsMap = shortcutsMap

    return (
      <Popover
        content={(
          <BlueprintDateRangePicker
            {...commonDateRangeProps}
            shortcuts={shortcuts}
          />
        )}
        isOpen={isOpen === undefined ? undefined : isOpen}
        hasBackdrop
        minimal
        onOpened={removePopoverDismiss}
        onOpening={() => {
          addControls({ onApply: this.onApply, t })
          highlightSelectedShortcut({ range })
        }}
        onClose={this.onClose}
        popoverClassName={popoverClassName}
        transitionDuration={0}
      >
        {children || <span />}
      </Popover>
    )
  }
}

DateRangePicker.propTypes = propTypes
DateRangePicker.defaultProps = defaultProps

export default withTranslation('translations')(DateRangePicker)
