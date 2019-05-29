import { connect } from 'react-redux'

import { clearStatus } from 'state/status/actions'
import { getIntent, getMsg } from 'state/status/selectors'

import Status from './Status'

const mapStateToProps = (state = {}) => ({
  intent: getIntent(state),
  msg: getMsg(state),
})

const mapDispatchToProps = {
  clearStatus,
}

const StatusContainer = connect(mapStateToProps, mapDispatchToProps)(Status)

export default StatusContainer
