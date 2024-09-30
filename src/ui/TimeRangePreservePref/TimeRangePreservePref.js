import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

const TimeRangePreservePref = (props) => {
  const { isTimeRangePreserved, toggleTimeRangePreserve } = props

  const onChange = () => {
    tracker.trackEvent('Preserve Timeframe')
    toggleTimeRangePreserve()
  }

  return (
    <Checkbox
      checked={isTimeRangePreserved}
      onChange={() => onChange()}
      large
    />
  )
}

TimeRangePreservePref.propTypes = {
  isTimeRangePreserved: PropTypes.bool.isRequired,
  toggleTimeRangePreserve: PropTypes.func.isRequired,
}

export default TimeRangePreservePref
