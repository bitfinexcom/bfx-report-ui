import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'
import { syncAfterUpdate } from 'state/auth/actions'
import { getShouldNotSyncOnStartupAfterUpdate } from 'state/auth/selectors'

const SyncAfterUpdatePref = () => {
  const dispatch = useDispatch()
  const shouldSyncAfterUpdate = !useSelector(getShouldNotSyncOnStartupAfterUpdate)

  const onChange = () => {
    tracker.trackEvent('Auto Sync After Update')
    dispatch(syncAfterUpdate(shouldSyncAfterUpdate))
  }

  return (
    <Checkbox
      large
      onChange={() => onChange()}
      checked={shouldSyncAfterUpdate}
    />
  )
}

export default SyncAfterUpdatePref
