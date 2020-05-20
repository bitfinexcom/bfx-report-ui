import React, { PureComponent } from 'react'

import Select from 'ui/Select'
import types from 'state/base/constants'

import { propTypes, defaultProps } from './DateFormatSelector.props'

class DateFormatSelector extends PureComponent {
  handleClick = (format) => {
    const { dateFormat, setDateFormat } = this.props
    if (dateFormat !== format) {
      setDateFormat(format)
    }
  }

  render() {
    const { dateFormat } = this.props

    return (
      <Select
        className='bitfinex-select--date-format'
        popoverClassName='bitfinex-select-menu--date-format'
        value={dateFormat}
        items={types.DATE_FORMATS}
        onChange={this.handleClick}
      />
    )
  }
}

DateFormatSelector.propTypes = propTypes
DateFormatSelector.defaultProps = defaultProps

export default DateFormatSelector
