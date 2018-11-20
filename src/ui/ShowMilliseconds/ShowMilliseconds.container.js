import { connect } from 'react-redux'

import actions from 'state/base/actions'
import { getShowMilliseconds } from 'state/base/selectors'

import ShowMilliseconds from './ShowMilliseconds'

const mapStateToProps = (state = {}) => ({
  milliseconds: getShowMilliseconds(state),
})

const mapDispatchToProps = dispatch => ({
  showMilliseconds: show => dispatch(actions.showMilliseconds(show)),
})

const ShowMillisecondsContainer = connect(mapStateToProps, mapDispatchToProps)(ShowMilliseconds)

export default ShowMillisecondsContainer
