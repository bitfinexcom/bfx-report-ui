import { connect } from 'react-redux'

import baseActions from 'state/base/actions'
import { getTheme } from 'state/base/selectors'

import PrefDialog from './PrefDialog'

const mapStateToProps = (state = {}) => ({
  theme: getTheme(state),
})

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(baseActions.setTheme(theme)),
})

const PrefDialogContainer = connect(mapStateToProps, mapDispatchToProps)(PrefDialog)

export default PrefDialogContainer
