import React, { memo } from 'react'

import Icon from 'icons'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeFrame.props'

const TimeFrame = ({
  end,
  start,
  timezone,
  toggleDialog,
}) => (
  <div className='timeframe'>
    <div
      className='timeframe-wrapper'
      onClick={toggleDialog}
    >
      <div className='timeframe-target'>
        <Icon.CALENDAR />
        <div className='timeframe-range'>
          {`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
        </div>
      </div>
    </div>
  </div>
)

TimeFrame.propTypes = propTypes
TimeFrame.defaultProps = defaultProps

export default memo(TimeFrame)
