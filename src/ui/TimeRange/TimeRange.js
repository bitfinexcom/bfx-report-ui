import React, { PureComponent } from 'react'

import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeRange.props'

class TimeRange extends PureComponent {
  render() {
    const {
      end,
      start,
      timezone,
    } = this.props
    return (
      <span className='bitfinex-show-soft bitfinex-timerange'>
        {`${formatDate(start, timezone)} — ${formatDate(end, timezone)}`}
      </span>
    )
  }
}

TimeRange.propTypes = propTypes
TimeRange.defaultProps = defaultProps

export default TimeRange
