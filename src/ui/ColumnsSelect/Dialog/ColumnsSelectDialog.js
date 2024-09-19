import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import {
  Button, Classes, Dialog, Intent,
} from '@blueprintjs/core'

import Icon from 'icons'

const ColumnsSelectDialog = (props) => {
  const {
    children,
    isOpen,
    hasChanges,
    onCancel,
    onApply,
    t,
  } = props

  return (
    <Dialog
      className='columns-select-dialog'
      icon={<Icon.CURSOR_SQUARE />}
      isCloseButtonShown={false}
      isOpen={isOpen}
      onClose={onCancel}
      title={t('columnsselect.title')}
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
            intent={Intent.PRIMARY}
            onClick={onApply}
            disabled={!hasChanges}
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
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(ColumnsSelectDialog)
