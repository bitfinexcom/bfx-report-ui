import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@blueprintjs/core'

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

SyncAfterUpdatePref.propTypes = {
  syncAfterUpdate: PropTypes.func.isRequired,
  shouldSyncAfterUpdate: PropTypes.bool.isRequired,
}

export default SyncAfterUpdatePref
