import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import _castArray from 'lodash/castArray'

import Icon from 'icons'
import CollapsedTable from 'ui/CollapsedTable/CollapsedTable'

import getColumns from './ExtraInfoDialog.columns'

const ExtraInfoDialog = ({
  t,
  isOpen,
  extraInfo,
  timeOffset,
  getFullTime,
  toggleDialog,
}) => {
  const tableColumns = getColumns({
    t,
    timeOffset,
    getFullTime,
    filteredData: _castArray(extraInfo),
  })

  return (
    <Dialog
      usePortal
      isOpen={isOpen}
      onClose={toggleDialog}
      className='extra-info'
      isCloseButtonShown={false}
      icon={<Icon.INFO_CIRCLE />}
      title={t('movements.moreDetails')}
    >
      <div className={Classes.DIALOG_BODY}>
        <CollapsedTable numRows={1} tableColumns={tableColumns} />
      </div>
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
    transactionId: PropTypes.string,
  }),
  getFullTime: PropTypes.func.isRequired,
  timeOffset: PropTypes.string.isRequired,
}

ExtraInfoDialog.defaultProps = {
  extraInfo: {},
}

export default memo(ExtraInfoDialog)
