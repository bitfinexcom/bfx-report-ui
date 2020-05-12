import React, { PureComponent } from 'react'
import classNames from 'classnames'

import Icon from 'icons'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeRange.props'

class TimeRange extends PureComponent {
  render() {
    const {
      className,
      end,
      icon,
      start,
      timezone,
      toggleTimeFrameDialog,
    } = this.props

    return (
      <div className={classNames('time-range', className)} onClick={() => toggleTimeFrameDialog(true)}>
        {icon && <Icon.CALENDAR />}
        <span>
          {`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
        </span>
      </div>
    )
  }
}

TimeRange.propTypes = propTypes
TimeRange.defaultProps = defaultProps

export default TimeRange
