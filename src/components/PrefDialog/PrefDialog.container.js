import { connect } from 'react-redux'

import { setTheme, setTimezone } from 'state/base/actions'
import { getTheme, getTimezone } from 'state/base/selectors'

import PrefDialog from './PrefDialog'

const mapStateToProps = (state = {}) => ({
  theme: getTheme(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = {
  setTheme,
  setTimeZone: setTimezone,
}

const PrefDialogContainer = connect(mapStateToProps, mapDispatchToProps)(PrefDialog)

export default PrefDialogContainer
