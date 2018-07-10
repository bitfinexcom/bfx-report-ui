import React from 'react'
import {
  Callout,
  Icon,
  Intent,
} from '@blueprintjs/core'
import { propTypes, defaultProps } from './Status.props'

export const Status = ({ clearStatus, intent, msg }) => (msg ? (
  <Callout intent={intent || Intent.PRIMARY}>{msg} <Icon icon='cross' className='bitfinex-status-close' onClick={clearStatus} /></Callout>
) : '')

Status.propTypes = propTypes
Status.defaultProps = defaultProps

export default Status
