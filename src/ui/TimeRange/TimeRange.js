import React, { memo } from 'react'
import classNames from 'classnames'

import Icon from 'icons'
import { tracker } from 'utils/trackers'
import { formatDate } from 'state/utils'
import { getSourceFromPathName } from 'utils/browser'

import { propTypes, defaultProps } from './TimeRange.props'

const TimeRange = ({
  className,
  end,
  icon,
  start,
  timezone,
  toggleTimeFrameDialog,
}) => {
  const onClick = () => {
    tracker.trackEvent('Date', getSourceFromPathName())
    toggleTimeFrameDialog()
  }

  return (
    <div
      onClick={() => onClick()}
      className={classNames('time-range', className)}
    >
      <span>
        {`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
      </span>
      {icon && <Icon.CALENDAR />}
    </div>
  )
}

TimeRange.propTypes = propTypes
TimeRange.defaultProps = defaultProps

export default memo(TimeRange)
