import React from 'react'
import PropTypes from 'prop-types'
import {
  Callout,
  Intent,
} from '@blueprintjs/core'

export const Status = props => (props.msg ? (
  <Callout intent={props.intent || Intent.PRIMARY}>{props.msg}</Callout>
) : '')

Status.propTypes = {
  msg: PropTypes.string,
  intent: PropTypes.string,
}

export default Status
