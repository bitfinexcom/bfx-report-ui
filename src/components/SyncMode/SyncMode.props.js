import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  intl: intlShape.isRequired,
  SyncMode: PropTypes.string.isRequired,
  startSyncing: PropTypes.func,
  stopSyncing: PropTypes.func,
}

export const defaultProps = {
  intl: {},
  SyncMode: '',
  startSyncing: () => {},
  stopSyncing: () => {},
}
