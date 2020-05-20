import { connect } from 'react-redux'

import { setTimezone, setInputTimezone } from 'state/base/actions'
import { getTimezone, getInputTimezone } from 'state/base/selectors'
import { togglePreferencesDialog } from 'state/ui/actions'
import { getIsPreferencesDialogOpen } from 'state/ui/selectors'

import Preferences from './Preferences'

const mapStateToProps = state => ({
  timezone: getTimezone(state),
  inputTimezone: getInputTimezone(state),
  isOpen: getIsPreferencesDialogOpen(state),
})

const mapDispatchToProps = {
  setTimezone,
  setInputTimezone,
  toggleDialog: togglePreferencesDialog,
}

const PreferencesContainer = connect(mapStateToProps, mapDispatchToProps)(Preferences)

export default PreferencesContainer
