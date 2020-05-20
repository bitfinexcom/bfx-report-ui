import { withTranslation } from 'react-i18next'
import {
  Toaster,
  Intent,
  Position,
} from '@blueprintjs/core'

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
  t,
}) => {
  if (!msg.id) {
    return ''
  }

  const params = {
    ...msg,
    topic: msg.topic ? t(msg.topic) || msg.topic : undefined,
  }
  setTimeout(() => {
    AppToaster.show({
      intent: intent || Intent.PRIMARY,
      message: t(msg.id, params),
      onDismiss: clearStatus,
      timeout: 10000, // 10s
    })
  }, 0)

  return ''
}

Status.propTypes = propTypes
Status.defaultProps = defaultProps

export default withTranslation('translations')(Status)
