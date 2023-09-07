import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { toggleExtraInfoDialog } from 'state/ui/actions'
import { getIsExtraInfoDialogOpen } from 'state/ui/selectors'
import { getMovementInfo } from 'state/movements/selectors'

import ExtraInfoDialog from './ExtraInfoDialog'

const mapStateToProps = state => ({
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
