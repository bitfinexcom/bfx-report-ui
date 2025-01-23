import React from 'react'

import Icon from 'icons'
import mode from 'state/sync/constants'

const {
  MODE_ONLINE,
  MODE_OFFLINE,
} = mode

export const getModeTitle = (syncMode) => {
  switch (syncMode) {
    case MODE_ONLINE:
    default:
      return 'sync.online'
    case MODE_OFFLINE:
      return 'sync.offline'
  }
}

export const getModeTooltipMessage = (syncMode) => {
  switch (syncMode) {
    case MODE_ONLINE:
    default:
      return 'sync.online_tooltip'
    case MODE_OFFLINE:
      return 'sync.offline_tooltip'
  }
}

export const getModeIcon = (syncMode) => {
  switch (syncMode) {
    case MODE_ONLINE:
    default:
      return <Icon.CHECKMARK_CIRCLE />
    case MODE_OFFLINE:
      return <Icon.OFFLINE />
  }
}

export default {
  getModeIcon,
  getModeTitle,
  getModeTooltipMessage,
}
