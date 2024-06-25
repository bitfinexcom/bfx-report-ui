import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'
import { showMilliseconds } from 'state/base/actions'
import { getShowMilliseconds } from 'state/base/selectors'

const ShowMilliseconds = () => {
  const dispatch = useDispatch()
  const milliseconds = useSelector(getShowMilliseconds)

  const handleChange = () => {
    tracker.trackEvent('Display Milliseconds')
    dispatch(showMilliseconds(!milliseconds))
  }

  return (
    <Checkbox
      checked={milliseconds}
      onChange={handleChange}
      large
    />
  )
}

export default ShowMilliseconds
