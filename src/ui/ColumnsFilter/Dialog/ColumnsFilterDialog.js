import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  Button, Classes, Dialog, Intent,
} from '@blueprintjs/core'

import Icon from 'icons'

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

ColumnsFilterDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  hasChanges: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onFiltersApply: PropTypes.func.isRequired,
}

export default memo(ColumnsFilterDialog)
