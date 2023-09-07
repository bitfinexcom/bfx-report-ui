import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { toggleExtraInfoDialog } from 'state/ui/actions'
import { getMovementInfo } from 'state/movements/selectors'
import { getIsExtraInfoDialogOpen } from 'state/ui/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'

import ExtraInfoDialog from './ExtraInfoDialog'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  extraInfo: getMovementInfo(state),
  isOpen: getIsExtraInfoDialogOpen(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleExtraInfoDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(ExtraInfoDialog)
