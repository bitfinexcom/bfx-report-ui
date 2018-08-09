import { connect } from 'react-redux'
import baseActions from 'state/base/actions'
import PrefDialog from './PrefDialog'

function mapStateToProps(state = {}) {
  return {
    theme: state.base.theme,
  }
}

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(baseActions.setTheme(theme)),
})

const PrefDialogContainer = connect(mapStateToProps, mapDispatchToProps)(PrefDialog)

export default PrefDialogContainer
