import React from 'react'
import { Checkbox } from '@blueprintjs/core'

import { propTypes, defaultProps } from './TimeRangePreservePref.props'

const TimeRangePreservePref = (props) => {
  const { isTimeRangePreserved, toggleTimeRangePreserve } = props

  return (
    <Checkbox
      checked={isTimeRangePreserved}
      onChange={toggleTimeRangePreserve}
      large
    />
  )
}

TimeRangePreservePref.propTypes = propTypes
TimeRangePreservePref.defaultProps = defaultProps

export default TimeRangePreservePref
