import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/Select'
import types from 'state/base/constants'

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
        type={'Date Format'}
      />
    )
  }
}

DateFormatSelector.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  setDateFormat: PropTypes.func.isRequired,
}

export default DateFormatSelector
