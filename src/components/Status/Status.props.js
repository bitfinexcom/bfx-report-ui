import PropTypes from 'prop-types'
import { Intent } from '@blueprintjs/core'

export const propTypes = {
  msg: PropTypes.string,
  intent: PropTypes.string,
}

export const defaultProps = {
  msg: '',
  intent: Intent.PRIMARY,
}
