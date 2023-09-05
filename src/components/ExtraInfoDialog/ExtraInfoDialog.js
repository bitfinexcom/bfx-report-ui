import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'

const ExtraInfoDialog = ({
  t,
  isOpen,
  toggleDialog,
}) => (
  <Dialog
    usePortal
    isOpen={isOpen}
    onClose={toggleDialog}
    className='preferences'
    isCloseButtonShown={false}
    title={t('movements.moreDetails')}
    icon={<Icon.INFO_CIRCLE />}
  >
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <div className='remove-account-wrapper' />
        <Button
          onClick={toggleDialog}
          intent={Intent.PRIMARY}
        >
          {t('preferences.close')}
        </Button>
      </div>
    </div>
  </Dialog>
)

ExtraInfoDialog.propTypes = {
  t: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}

export default memo(ExtraInfoDialog)
