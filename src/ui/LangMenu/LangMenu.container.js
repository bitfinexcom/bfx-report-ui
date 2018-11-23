import { connect } from 'react-redux'

import baseActions from 'state/base/actions'
import { getLocale } from 'state/base/selectors'

import LangMenu from './LangMenu'

const mapStateToProps = (state = {}) => ({
  locale: getLocale(state),
})

const mapDispatchToProps = dispatch => ({
  setLang: lang => dispatch(baseActions.setLang(lang)),
})

const LangMenuContainer = connect(mapStateToProps, mapDispatchToProps)(LangMenu)

export default LangMenuContainer
