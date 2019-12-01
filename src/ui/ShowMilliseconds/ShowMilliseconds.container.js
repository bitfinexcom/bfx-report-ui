import { connect } from 'react-redux'

import { showMilliseconds } from 'state/base/actions'
import { getShowMilliseconds } from 'state/base/selectors'

import ShowMilliseconds from './ShowMilliseconds'

const mapStateToProps = state => ({
  milliseconds: getShowMilliseconds(state),
})

const mapDispatchToProps = {
  showMilliseconds,
}

const ShowMillisecondsContainer = connect(mapStateToProps, mapDispatchToProps)(ShowMilliseconds)

export default ShowMillisecondsContainer
