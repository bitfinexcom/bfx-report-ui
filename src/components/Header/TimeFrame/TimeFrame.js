import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Icon from 'icons'
import { formatDate } from 'state/utils'

const TimeFrame = ({
  end,
  start,
  timezone,
  toggleDialog,
}) => (
  <div className='timeframe'>
    <div
      onClick={toggleDialog}
      className='timeframe-wrapper'
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

TimeFrame.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  timezone: PropTypes.string.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}

TimeFrame.defaultProps = {
  start: 0,
  end: 0,
}

export default memo(TimeFrame)
