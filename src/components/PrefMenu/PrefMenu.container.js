import { connect } from 'react-redux'

import baseActions from 'state/base/actions'
import { getLocale } from 'state/base/selectors'

import PrefMenu from './PrefMenu'

const mapStateToProps = (state = {}) => ({
  locale: getLocale(state),
})

const mapDispatchToProps = dispatch => ({
  setLang: lang => dispatch(baseActions.setLang(lang)),
})

const PrefMenuContainer = connect(mapStateToProps, mapDispatchToProps)(PrefMenu)

export default PrefMenuContainer
