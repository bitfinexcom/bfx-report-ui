import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { switchSyncMode } from 'state/sync/actions'
import { getSyncMode } from 'state/sync/selectors'

import QueryMode from './QueryMode'

const mapStateToProps = state => ({
  syncMode: getSyncMode(state),
})

const mapDispatchToProps = {
  switchSyncMode,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(QueryMode)
