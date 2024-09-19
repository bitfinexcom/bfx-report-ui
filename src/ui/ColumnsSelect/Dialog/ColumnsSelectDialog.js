import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  Button, Classes, Dialog, Intent,
} from '@blueprintjs/core'

import Icon from 'icons'

const ColumnsSelectDialog = ({
  isOpen,
  onApply,
  children,
  onCancel,
  hasChanges,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onCancel}
      isCloseButtonShown={false}
      icon={<Icon.CURSOR_SQUARE />}
      title={t('columnsselect.title')}
      className='columns-select-dialog'
    >
      <div className={Classes.DIALOG_BODY}>
        {children}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            onClick={onCancel}
          >
            {t('columnsselect.cancel')}
          </Button>
          <Button
            onClick={onApply}
            disabled={!hasChanges}
            intent={Intent.PRIMARY}
          >
            {t('columnsselect.apply')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

ColumnsSelectDialog.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hasChanges: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
}

export default ColumnsSelectDialog
