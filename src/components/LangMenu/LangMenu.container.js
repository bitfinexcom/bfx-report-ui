import { connect } from 'react-redux'

import baseActions from 'state/base/actions'

import LangMenu from './LangMenu'

function mapStateToProps(state = {}) {
  return {
    locale: state.base.locale,
  }
}

const mapDispatchToProps = dispatch => ({
  setLang: lang => dispatch(baseActions.setLang(lang)),
})

const LangMenuContainer = connect(mapStateToProps, mapDispatchToProps)(LangMenu)

export default LangMenuContainer
