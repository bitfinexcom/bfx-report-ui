import React from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button, Classes, Dialog, Intent,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import { propTypes, defaultProps } from './ColumnsFilterDialog.props'

const ColumnsFilterDialog = (props) => {
  const {
    children,
    isOpen,
    hasChanges,
    onCancel,
    onFiltersApply,
    t,
  } = props

  return (
    <Dialog
      icon={IconNames.TH_FILTERED}
      onClose={onCancel}
      title={t('columnsfilter.title')}
      isOpen={isOpen}
    >
      <div className={Classes.DIALOG_BODY}>
        {children}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            onClick={onCancel}
          >
            {t('columnsfilter.cancel')}
          </Button>
          <Button
            intent={Intent.PRIMARY}
            onClick={onFiltersApply}
            disabled={!hasChanges}
          >
            {t('columnsfilter.apply')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

ColumnsFilterDialog.propTypes = propTypes
ColumnsFilterDialog.defaultProps = defaultProps

export default withTranslation('translations')(ColumnsFilterDialog)
