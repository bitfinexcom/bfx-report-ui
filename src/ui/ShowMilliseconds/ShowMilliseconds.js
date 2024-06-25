import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

const ShowMilliseconds = ({
  milliseconds,
  showMilliseconds,
}) => {
  const handleChange = () => {
    tracker.trackEvent('Display Milliseconds')
    showMilliseconds(!milliseconds)
  }

  return (
    <Checkbox
      checked={milliseconds}
      onChange={handleChange}
      large
    />
  )
}

ShowMilliseconds.propTypes = {
  milliseconds: PropTypes.bool,
  showMilliseconds: PropTypes.func,
}

ShowMilliseconds.defaultProps = {
  milliseconds: false,
  showMilliseconds: () => {},
}

export default memo(ShowMilliseconds)
