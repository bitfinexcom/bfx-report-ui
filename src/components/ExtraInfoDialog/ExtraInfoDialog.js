import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import _castArray from 'lodash/castArray'

import Icon from 'icons'
import { toggleExtraInfoDialog } from 'state/ui/actions'
import { getMovementInfo } from 'state/movements/selectors'
import { getIsExtraInfoDialogOpen } from 'state/ui/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import CollapsedTable from 'ui/CollapsedTable/CollapsedTable'

import getColumns from './ExtraInfoDialog.columns'

const ExtraInfoDialog = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const formatTime = useSelector(getFullTime)
  const timeOffset = useSelector(getTimeOffset)
  const isOpen = useSelector(getIsExtraInfoDialogOpen)
  const preparedData = _castArray(useSelector(getMovementInfo))

  const tableColumns = useMemo(
    () => getColumns({
      t, timeOffset, formatTime, preparedData,
    }), [t, timeOffset, formatTime, preparedData],
  )

  return (
    <Dialog
      usePortal
      isOpen={isOpen}
      className='extra-info'
      isCloseButtonShown={false}
      icon={<Icon.INFO_CIRCLE />}
      title={t('movements.moreDetails')}
      onClose={() => dispatch(toggleExtraInfoDialog())}
    >
      <div className={Classes.DIALOG_BODY}>
        <CollapsedTable numRows={1} tableColumns={tableColumns} />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            intent={Intent.PRIMARY}
            onClick={() => dispatch(toggleExtraInfoDialog())}
          >
            {t('preferences.close')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default ExtraInfoDialog
