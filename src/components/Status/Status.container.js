import { connect } from 'react-redux'

import actions from 'state/status/actions'
import { getIntent, getMsg } from 'state/status/selectors'

import Status from './Status'

const mapStateToProps = (state = {}) => ({
  intent: getIntent(state),
  msg: getMsg(state),
})

const mapDispatchToProps = dispatch => ({
  clearStatus: () => dispatch(actions.clearStatus()),
})

const StatusContainer = connect(mapStateToProps, mapDispatchToProps)(Status)

export default StatusContainer
