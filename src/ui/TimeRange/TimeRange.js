import React, { memo } from 'react'
import classNames from 'classnames'

import Icon from 'icons'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeRange.props'

const TimeRange = ({
  className,
  end,
  icon,
  start,
  timezone,
  toggleTimeFrameDialog,
}) => (
  <div
    className={classNames('time-range', className)}
    onClick={toggleTimeFrameDialog}
  >
    <span>
      {`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
    </span>
    {icon && <Icon.CALENDAR />}
  </div>
)

TimeRange.propTypes = propTypes
TimeRange.defaultProps = defaultProps

export default memo(TimeRange)
