import { connect } from 'react-redux'

import { setTheme, setTimezone, setInputTimezone } from 'state/base/actions'
import { getTheme, getTimezone, getInputTimezone } from 'state/base/selectors'

import PrefDialog from './PrefDialog'

const mapStateToProps = (state = {}) => ({
  theme: getTheme(state),
  timezone: getTimezone(state),
  inputTimezone: getInputTimezone(state),
})

const mapDispatchToProps = {
  setTheme,
  setTimezone,
  setInputTimezone,
}

const PrefDialogContainer = connect(mapStateToProps, mapDispatchToProps)(PrefDialog)

export default PrefDialogContainer
