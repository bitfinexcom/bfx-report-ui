import { connect } from 'react-redux'
import baseActions from 'state/base/actions'
import PrefMenu from './PrefMenu'

function mapStateToProps(state = {}) {
  return {
    locale: state.base.locale,
  }
}

const mapDispatchToProps = dispatch => ({
  setLang: lang => dispatch(baseActions.setLang(lang)),
})

const PrefMenuContainer = connect(mapStateToProps, mapDispatchToProps)(PrefMenu)

export default PrefMenuContainer
