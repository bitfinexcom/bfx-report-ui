import { connect } from 'react-redux'

import { getExplorers } from 'state/symbols/selectors'

import Explorer from './Explorer'

const mapStateToProps = (state = {}) => ({
  explorers: getExplorers(state),
})

const ExplorerContainer = connect(mapStateToProps)(Explorer)

export default ExplorerContainer
