import { connect } from 'react-redux'
import Status from './Status'

function mapStateToProps(state = {}) {
  return {
    intent: state.status.intent,
    msg: state.status.msg,
  }
}

const StatusContainer = connect(mapStateToProps)(Status)

export default StatusContainer
