import {
  Toaster,
  Intent,
  Position,
} from '@blueprintjs/core'

import i18n from 'locales/i18n'

import { propTypes, defaultProps } from './Status.props'

/** Singleton toaster instance. */
export const AppToaster = Toaster.create({
  className: 'bitfinex-toaster',
  position: Position.BOTTOM_RIGHT,
})

export const Status = ({
  clearStatus,
  intent,
  msg = {},
}) => {
  if (!msg.id) {
    return ''
  }

  const params = {
    ...msg,
    topic: msg.topic ? i18n.t(msg.topic) || msg.topic : undefined,
  }
  setTimeout(() => {
    AppToaster.show({
      intent: intent || Intent.PRIMARY,
      message: i18n.t(msg.id, params),
      onDismiss: clearStatus,
      timeout: 4000, // 4s
    })
  }, 0)

  return ''
}

Status.propTypes = propTypes
Status.defaultProps = defaultProps

export default Status
