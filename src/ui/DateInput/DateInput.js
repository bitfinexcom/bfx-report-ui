import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import moment from 'moment-timezone'
import { Position } from '@blueprintjs/core'
import { DateInput as BptDateInput, TimePrecision } from '@blueprintjs/datetime'

import Icon from 'icons'
import {
  DEFAULT_DATETIME_FORMAT, momentFormatter, momentFormatterDays,
} from 'state/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './DateInput.props'

class DateInput extends PureComponent {
  state = {
    isOpen: false,
  }

  onChange = (date) => {
    const { daysOnly, onChange } = this.props
    if (!date) {
      return onChange(null)
    }
    const offset = daysOnly ? moment().utcOffset() : 0

    const utcDate = moment(date).add({ minutes: offset }).toDate()
    return onChange(utcDate)
  }

  onToggle = (isOpen) => {
    this.setState({ isOpen })
  }

  render() {
    const {
      daysOnly,
      defaultValue,
      inputTimezone,
      t,
    } = this.props
    const { isOpen } = this.state

    // automatically create date from timestamp
    const defaultDate = (typeof defaultValue === 'object')
      ? defaultValue
      : defaultValue && new Date(defaultValue)

    const { formatDate, parseDate } = daysOnly
      ? momentFormatterDays()
      : momentFormatter(DEFAULT_DATETIME_FORMAT, inputTimezone)

    const timePrecision = (platform.showFrameworkMode && !daysOnly) ? TimePrecision.SECOND : undefined
    const icon = isOpen
      ? <Icon.CHEVRON_UP />
      : <Icon.CHEVRON_DOWN />

    return (
      <BptDateInput
        defaultValue={defaultDate}
        formatDate={formatDate}
        inputProps={{
          rightElement: icon,
        }}
        onChange={this.onChange}
        parseDate={parseDate}
        placeholder={t('selector.select')}
        popoverProps={{
          className: 'date-input-popover',
          minimal: true,
          onOpening: () => this.onToggle(true),
          onClosing: () => this.onToggle(false),
          position: Position.BOTTOM_LEFT,
        }}
        timePrecision={timePrecision}
      />
    )
  }
}

DateInput.propTypes = propTypes
DateInput.defaultProps = defaultProps

export default withTranslation('translations')(DateInput)
