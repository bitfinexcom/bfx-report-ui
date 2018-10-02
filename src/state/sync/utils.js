
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
      return 'pulse'
    case MODE_OFFLINE:
      return 'updated'
    case MODE_SYNCING:
    default:
      return 'refresh'
  }
}

export default {
  getIcon,
  getTooltipMessageId,
}
