import mode from 'state/sync/constants'

const {
  MODE_ONLINE,
  MODE_OFFLINE,
  MODE_SYNCING,
} = mode

export const getTitle = (syncMode) => {
  switch (syncMode) {
    case MODE_ONLINE:
    default:
      return 'sync.online'
    case MODE_OFFLINE:
      return 'sync.offline'
    case MODE_SYNCING:
      return 'sync.insync'
  }
}

export const getTooltipMessage = (syncMode) => {
  switch (syncMode) {
    case MODE_ONLINE:
    default:
      return 'sync.online_tooltip'
    case MODE_OFFLINE:
      return 'sync.offline_tooltip'
    case MODE_SYNCING:
      return 'sync.insync_tooltip'
  }
}

export default {
  getTitle,
  getTooltipMessage,
}
