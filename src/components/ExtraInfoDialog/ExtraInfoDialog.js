import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
// import CollapsedTable from 'ui/CollapsedTable/CollapsedTable'

const ExtraInfoDialog = ({
  t,
  isOpen,
  extraInfo,
  toggleDialog,
}) => {
  console.log('+++entries', extraInfo)
  return (
    <Dialog
      usePortal
      isOpen={isOpen}
      onClose={toggleDialog}
      className='extra-info'
      isCloseButtonShown={false}
      title={t('movements.moreDetails')}
      icon={<Icon.INFO_CIRCLE />}
    >
      {/* <CollapsedTable numRows={19} /> */}
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
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
}

ExtraInfoDialog.propTypes = {
  t: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  extraInfo: PropTypes.shape({
    amount: PropTypes.number,
    bankFees: PropTypes.number,
    bankRouterId: PropTypes.number,
    currency: PropTypes.string,
    currencyName: PropTypes.string,
    destinationAddress: PropTypes.string,
    externalBankAccInfo: PropTypes.string,
    externalBankMovDescription: PropTypes.string,
    externalBankMovId: PropTypes.string,
    externalBankMovStatus: PropTypes.string,
    fees: PropTypes.number,
    id: PropTypes.number,
    memo: PropTypes.string,
    mtsStarted: PropTypes.number,
    mtsUpdated: PropTypes.number,
    note: PropTypes.string,
    remark: PropTypes.string,
    status: PropTypes.string,
    transactionId: PropTypes.number,
  }),
}

ExtraInfoDialog.defaultProps = {
  extraInfo: {},
}

export default memo(ExtraInfoDialog)
