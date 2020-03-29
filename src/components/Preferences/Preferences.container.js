import { connect } from 'react-redux'

import { setTimezone, setInputTimezone } from 'state/base/actions'
import { getTimezone, getInputTimezone } from 'state/base/selectors'

import Preferences from './Preferences'

const mapStateToProps = state => ({
  timezone: getTimezone(state),
  inputTimezone: getInputTimezone(state),
})

const mapDispatchToProps = {
  setTimezone,
  setInputTimezone,
}

const PreferencesContainer = connect(mapStateToProps, mapDispatchToProps)(Preferences)

export default PreferencesContainer
