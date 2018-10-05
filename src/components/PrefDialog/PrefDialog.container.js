import { connect } from 'react-redux'

import baseActions from 'state/base/actions'
import { getTheme, getTimezone } from 'state/base/selectors'

import PrefDialog from './PrefDialog'

const mapStateToProps = (state = {}) => ({
  theme: getTheme(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(baseActions.setTheme(theme)),
  setTimeZone: timezone => dispatch(baseActions.setTimezone(timezone)),
})

const PrefDialogContainer = connect(mapStateToProps, mapDispatchToProps)(PrefDialog)

export default PrefDialogContainer
