import mode from 'state/sync/constants'

const {
  MODE_ONLINE,
  MODE_OFFLINE,
  MODE_SYNCING,
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

export const getSyncTitle = (syncMode) => {
  switch (syncMode) {
    case MODE_ONLINE:
    default:
      return 'sync.start'
    case MODE_SYNCING:
      return 'sync.stop-sync'
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

export const getSyncTooltipMessage = (syncMode) => {
  switch (syncMode) {
    default:
      return 'sync.start_sync_tooltip'
    case MODE_SYNCING:
      return 'sync.insync_tooltip'
  }
}

export default {
  getModeTitle,
  getSyncTitle,
  getModeTooltipMessage,
  getSyncTooltipMessage,
}
