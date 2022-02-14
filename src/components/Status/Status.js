import PropTypes from 'prop-types'
import {
  Toaster,
  Intent,
  Position,
} from '@blueprintjs/core'

import i18n from 'locales/i18n'

/** Singleton toaster instance. */
export const AppToaster = Toaster.create({
  className: 'bitfinex-toaster',
  position: Position.BOTTOM_RIGHT,
})

export const Status = ({
  msg,
  intent,
  clearStatus,
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

Status.propTypes = {
  intent: PropTypes.string,
  clearStatus: PropTypes.func,
  msg: PropTypes.objectOf(PropTypes.string),
}
Status.defaultProps = {
  msg: {},
  clearStatus: () => {},
  intent: Intent.PRIMARY,
}

export default Status
