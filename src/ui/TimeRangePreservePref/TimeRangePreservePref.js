import React from 'react'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

import { propTypes, defaultProps } from './TimeRangePreservePref.props'

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

TimeRangePreservePref.propTypes = propTypes
TimeRangePreservePref.defaultProps = defaultProps

export default TimeRangePreservePref
