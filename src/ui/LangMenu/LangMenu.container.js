import { connect } from 'react-redux'

import { setLang } from 'state/base/actions'
import { getLocale } from 'state/base/selectors'

import LangMenu from './LangMenu'

const mapStateToProps = state => ({
  value: getLocale(state),
})

const mapDispatchToProps = {
  setLang,
}

const LangMenuContainer = connect(mapStateToProps, mapDispatchToProps)(LangMenu)

export default LangMenuContainer
