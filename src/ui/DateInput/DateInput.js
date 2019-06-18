import React, { PureComponent } from 'react'
import moment from 'moment-timezone'
import { DateInput as BptDateInput, TimePrecision } from '@blueprintjs/datetime'

import {
  DEFAULT_DATETIME_FORMAT, momentFormatter, momentFormatterDays,
} from 'state/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './DateInput.props'

class DateInput extends PureComponent {
  onChange = (date) => {
    const { daysOnly, onChange } = this.props
    if (!date) {
      onChange(null)
    }
    const offset = daysOnly ? moment().utcOffset() : 0

    const utcDate = moment(date).add({ minutes: offset }).toDate()
    onChange(utcDate)
  }

  render() {
    const {
      value,
      inputTimezone,
      daysOnly,
    } = this.props

    const { formatDate, parseDate } = daysOnly
      ? momentFormatterDays()
      : momentFormatter(DEFAULT_DATETIME_FORMAT, inputTimezone)

    const timePrecision = (platform.showSyncMode && !daysOnly) ? TimePrecision.SECOND : undefined

    return (
      <BptDateInput
        formatDate={formatDate}
        parseDate={parseDate}
        onChange={this.onChange}
        defaultValue={value}
        timePrecision={timePrecision}
      />
    )
  }
}

DateInput.propTypes = propTypes
DateInput.defaultProps = defaultProps

export default DateInput
