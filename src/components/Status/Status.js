import React from 'react'
import {
  Callout,
  Intent,
} from '@blueprintjs/core'
import { propTypes, defaultProps } from './Status.props'

export const Status = props => (props.msg ? (
  <Callout intent={props.intent || Intent.PRIMARY}>{props.msg}</Callout>
) : '')

Status.propTypes = propTypes
Status.defaultProps = defaultProps

export default Status
