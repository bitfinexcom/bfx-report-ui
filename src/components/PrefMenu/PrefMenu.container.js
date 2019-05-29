import { connect } from 'react-redux'

import { setLang } from 'state/base/actions'
import { getLocale } from 'state/base/selectors'

import PrefMenu from './PrefMenu'

const mapStateToProps = (state = {}) => ({
  locale: getLocale(state),
})

const mapDispatchToProps = {
  setLang,
}

const PrefMenuContainer = connect(mapStateToProps, mapDispatchToProps)(PrefMenu)

export default PrefMenuContainer
