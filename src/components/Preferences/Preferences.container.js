import { connect } from 'react-redux'

import { setTheme, setTimezone, setInputTimezone } from 'state/base/actions'
import { getTheme, getTimezone, getInputTimezone } from 'state/base/selectors'

import Preferences from './Preferences'

const mapStateToProps = state => ({
  theme: getTheme(state),
  timezone: getTimezone(state),
  inputTimezone: getInputTimezone(state),
})

const mapDispatchToProps = {
  setTheme,
  setTimezone,
  setInputTimezone,
}

const PreferencesContainer = connect(mapStateToProps, mapDispatchToProps)(Preferences)

export default PreferencesContainer
