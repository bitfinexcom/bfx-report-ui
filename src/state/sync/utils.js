import { IconNames } from '@blueprintjs/icons'

import types from './constants'

const {
  MODE_ONLINE,
  MODE_OFFLINE,
  MODE_SYNCING,
} = types

export function getTooltipMessageId(mode) {
  switch (mode) {
    case MODE_ONLINE:
      return 'sync.online'
    case MODE_OFFLINE:
      return 'sync.offline'
    case MODE_SYNCING:
    default:
      return 'sync.insync'
  }
}

export function getIcon(mode) {
  switch (mode) {
    case MODE_ONLINE:
      return IconNames.PULSE
    case MODE_OFFLINE:
      return IconNames.UPDATED
    case MODE_SYNCING:
    default:
      return IconNames.REFRESH
  }
}

export default {
  getIcon,
  getTooltipMessageId,
}
