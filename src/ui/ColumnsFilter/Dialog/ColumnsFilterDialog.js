import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button, Classes, Dialog, Intent,
} from '@blueprintjs/core'

import Icon from 'icons'

import { propTypes, defaultProps } from './ColumnsFilterDialog.props'

const ColumnsFilterDialog = ({
  isOpen,
  onClear,
  onCancel,
  children,
  hasChanges,
  onFiltersApply,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onCancel}
      icon={<Icon.FILTER />}
      isCloseButtonShown={false}
      title={t('columnsfilter.title')}
      className='columns-filter-dialog'
    >
      <div className={Classes.DIALOG_BODY}>
        {children}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            onClick={onClear}
            className='columns-filter-clear'
          >
            {t('columnsfilter.clear')}
          </Button>
          <Button
            onClick={onCancel}
          >
            {t('columnsfilter.cancel')}
          </Button>
          <Button
            disabled={!hasChanges}
            intent={Intent.PRIMARY}
            onClick={onFiltersApply}
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

export default ColumnsFilterDialog
