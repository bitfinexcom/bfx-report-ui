import { connect } from 'react-redux'

import actions from 'state/status/actions'

import Status from './Status'

function mapStateToProps(state = {}) {
  return {
    intent: state.status.intent,
    msg: state.status.msg,
  }
}

const mapDispatchToProps = dispatch => ({
  clearStatus: () => dispatch(actions.clearStatus()),
})

const StatusContainer = connect(mapStateToProps, mapDispatchToProps)(Status)

export default StatusContainer
