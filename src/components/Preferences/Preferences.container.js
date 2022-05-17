import { connect } from 'react-redux'

import { setTimezone } from 'state/base/actions'
import { getTimezone } from 'state/base/selectors'
import { togglePreferencesDialog } from 'state/ui/actions'
import { getIsPreferencesDialogOpen } from 'state/ui/selectors'

import Preferences from './Preferences'

const mapStateToProps = state => ({
  timezone: getTimezone(state),
  isOpen: getIsPreferencesDialogOpen(state),
})

const mapDispatchToProps = {
  setTimezone,
  toggleDialog: togglePreferencesDialog,
}

const PreferencesContainer = connect(mapStateToProps, mapDispatchToProps)(Preferences)

export default PreferencesContainer
