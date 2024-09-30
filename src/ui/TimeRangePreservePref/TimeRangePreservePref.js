import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

const TimeRangePreservePref = ({
  isTimeRangePreserved,
  toggleTimeRangePreserve,
}) => {
  const onChange = () => {
    toggleTimeRangePreserve()
    tracker.trackEvent('Preserve Timeframe')
  }

  return (
    <Checkbox
      large
      onChange={() => onChange()}
      checked={isTimeRangePreserved}
    />
  )
}

TimeRangePreservePref.propTypes = {
  isTimeRangePreserved: PropTypes.bool.isRequired,
  toggleTimeRangePreserve: PropTypes.func.isRequired,
}

export default TimeRangePreservePref
