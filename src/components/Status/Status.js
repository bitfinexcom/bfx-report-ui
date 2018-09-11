import { injectIntl } from 'react-intl'
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
  intl,
  msg = {},
}) => {
  if (!msg.id) {
    return ''
  }

  const params = {
    ...msg,
    topic: msg.topic ? intl.formatMessage({ id: msg.topic }) || msg.topic : undefined,
  }
  AppToaster.show({
    intent: intent || Intent.PRIMARY,
    message: intl.formatMessage({ id: msg.id }, params),
    onDismiss: clearStatus,
    timeout: 10000, // 10s
  })
  return ''
}

Status.propTypes = propTypes
Status.defaultProps = defaultProps

export default injectIntl(Status)
