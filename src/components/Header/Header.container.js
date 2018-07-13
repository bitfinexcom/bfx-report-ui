import { connect } from 'react-redux'
import authActions from 'state/auth/actions'
import baseActions from 'state/base/actions'
import Header from './Header'

function mapStateToProps(state = {}) {
  return {
    authIsShown: state.auth.isShown,
    authStatus: state.auth.authStatus,
    lang: state.base.lang,
    theme: state.base.theme,
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
  setLang: lang => dispatch(baseActions.setLang(lang)),
  setTheme: theme => dispatch(baseActions.setTheme(theme)),
})

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
