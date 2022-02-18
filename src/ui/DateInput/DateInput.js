import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import moment from 'moment-timezone'
import { Position } from '@blueprintjs/core'
import { DateInput as BptDateInput, TimePrecision } from '@blueprintjs/datetime'

import Icon from 'icons'
import {
  DEFAULT_DATETIME_FORMAT,
  momentFormatterDays,
  momentFormatter,
} from 'state/utils'

class DateInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    inputTimezone: PropTypes.string,
    daysOnly: PropTypes.bool,
    t: PropTypes.func.isRequired,
    timezone: PropTypes.string,
  }

  static defaultProps = {
    value: null,
    timezone: '',
    className: '',
    daysOnly: false,
    inputTimezone: '',
    defaultValue: null,
  }

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

  // automatically creates date from timestamp
  formatDate = date => (typeof date === 'object' ? date : date && new Date(date))

  render() {
    const {
      t,
      value,
      daysOnly,
      timezone,
      className,
      defaultValue,
      inputTimezone,
    } = this.props
    const { isOpen } = this.state

    const { formatDate, parseDate } = daysOnly
      ? momentFormatterDays()
      : momentFormatter(DEFAULT_DATETIME_FORMAT, timezone || inputTimezone)

    const timePrecision = !daysOnly ? TimePrecision.SECOND : undefined
    const icon = isOpen
      ? <Icon.CHEVRON_UP />
      : <Icon.CHEVRON_DOWN />

    return (
      <BptDateInput
        defaultValue={this.formatDate(defaultValue)}
        formatDate={formatDate}
        inputProps={{
          className,
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
        value={this.formatDate(value)}
      />
    )
  }
}

export default withTranslation('translations')(DateInput)
