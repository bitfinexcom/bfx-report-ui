import React from 'react'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

const ExportToPdf = ({
  milliseconds,
  showMilliseconds,
}) => {
  const handleChange = () => {
    tracker.trackEvent('Display Milliseconds')
    showMilliseconds(!milliseconds)
  }

  return (
    <Checkbox
      large
      checked={milliseconds}
      onChange={handleChange}
    />
  )
}

export default ExportToPdf
