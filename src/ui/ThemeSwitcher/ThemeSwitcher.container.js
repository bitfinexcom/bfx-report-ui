import { connect } from 'react-redux'

import { setTheme } from 'state/base/actions'
import { getTheme } from 'state/base/selectors'

import ThemeSwitcher from './ThemeSwitcher'

const mapStateToProps = state => ({
  theme: getTheme(state),
})

const mapDispatchToProps = {
  setTheme,
}

const ThemeSwitcherContainer = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher)

export default ThemeSwitcherContainer
