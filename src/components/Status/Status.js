import React from 'react'
import { injectIntl } from 'react-intl'
import {
  Callout,
  Icon,
  Intent,
} from '@blueprintjs/core'

import { propTypes, defaultProps } from './Status.props'

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
  return (
    <Callout intent={intent || Intent.PRIMARY}>
      {intl.formatMessage({ id: msg.id }, params)}
      <Icon icon='cross' className='bitfinex-status-close' onClick={clearStatus} />
    </Callout>
  )
}

Status.propTypes = propTypes
Status.defaultProps = defaultProps

export default injectIntl(Status)
