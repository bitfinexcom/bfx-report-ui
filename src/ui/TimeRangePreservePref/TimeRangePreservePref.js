import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '@blueprintjs/core'

import { toggleTimeRangePreserve } from 'state/timeRange/actions'
import { getIsTimeRangePreserved } from 'state/timeRange/selectors'

import { tracker } from 'utils/trackers'

const TimeRangePreservePref = () => {
  const dispatch = useDispatch()
  const isTimeRangePreserved = useSelector(getIsTimeRangePreserved)

  const onChange = () => {
    dispatch(toggleTimeRangePreserve())
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

export default TimeRangePreservePref
