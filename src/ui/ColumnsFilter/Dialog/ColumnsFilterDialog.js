import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Intent,
  Dialog,
  Classes,
} from '@blueprintjs/core'

import Icon from 'icons'

const ColumnsFilterDialog = ({
  t,
  isOpen,
  onClear,
  onCancel,
  children,
  hasChanges,
  onFiltersApply,
}) => (
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

ColumnsFilterDialog.propTypes = {
  t: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  hasChanges: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onFiltersApply: PropTypes.func.isRequired,
}

export default withTranslation('translations')(memo(ColumnsFilterDialog))
