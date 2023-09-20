import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '@blueprintjs/core'

import { syncAfterUpdate } from 'state/auth/actions'
import { getShouldNotSyncOnStartupAfterUpdate } from 'state/auth/selectors'

const SyncAfterUpdatePref = () => {
  const dispatch = useDispatch()
  const shouldSyncAfterUpdate = !useSelector(getShouldNotSyncOnStartupAfterUpdate)

  return (
    <Checkbox
      large
      checked={shouldSyncAfterUpdate}
      onChange={() => dispatch(syncAfterUpdate(shouldSyncAfterUpdate))}
    />
  )
}

export default SyncAfterUpdatePref
