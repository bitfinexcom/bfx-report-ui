import React from 'react'
import { Checkbox } from '@blueprintjs/core'

import { propTypes, defaultProps } from './SyncAfterUpdatePref.props'

const SyncAfterUpdatePref = (props) => {
  const { shouldSyncAfterUpdate, syncAfterUpdate } = props

  return (
    <Checkbox
      large
      checked={shouldSyncAfterUpdate}
      onChange={() => syncAfterUpdate(shouldSyncAfterUpdate)}
    />
  )
}

SyncAfterUpdatePref.propTypes = propTypes
SyncAfterUpdatePref.defaultProps = defaultProps

export default SyncAfterUpdatePref
