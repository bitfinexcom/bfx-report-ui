import React, { PureComponent } from 'react'
import { DateInput as BptDateInput, TimePrecision } from '@blueprintjs/datetime'

import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './DateInput.props'

class DateInput extends PureComponent {
  render() {
    const { value, onChange, inputTimezone } = this.props

    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, inputTimezone)
    const timePrecision = platform.showSyncMode ? TimePrecision.SECOND : undefined

    return (
      <BptDateInput
        formatDate={formatDate}
        parseDate={parseDate}
        onChange={onChange}
        value={value}
        timePrecision={timePrecision}
      />
    )
  }
}

DateInput.propTypes = propTypes
DateInput.defaultProps = defaultProps

export default DateInput
