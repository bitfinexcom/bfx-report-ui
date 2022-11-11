import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchAPositions,
} from 'state/positionsActive/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
} from 'state/positionsActive/selectors'

import PositionsActive from './PositionsActive'

const mapStateToProps = state => ({
  entries: getEntries(state),
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
})

const mapDispatchToProps = {
  refresh,
  fetchData: fetchAPositions,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(PositionsActive)
