import PropTypes from 'prop-types'
import { Intent } from '@blueprintjs/core'

export const propTypes = {
  clearStatus: PropTypes.func,
  intent: PropTypes.string,
  msg: PropTypes.string,
}

export const defaultProps = {
  clearStatus: () => {},
  intent: Intent.PRIMARY,
  msg: '',
}
