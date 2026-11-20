import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Classes, Dialog } from '@blueprintjs/core'
import _map from 'lodash/map'

const DownloadTypeDialog = ({
  isOpen,
  options,
  onClose,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      isCloseButtonShown={false}
      className='download-type-dialog'
      title={t('download_app.select_type')}
    >
      <div className={Classes.DIALOG_BODY}>
        <div className='download-type-dialog--options'>
          {_map(options, ({
            id, hint, link, label,
          }) => (
            <a
              key={id}
              href={link}
              target='_blank'
              onClick={onClose}
              rel='noopener noreferrer'
              className='download-type-dialog--option'
            >
              <span className='download-type-dialog--option-label'>
                {label}
              </span>
              {hint && (
                <span className='download-type-dialog--option-hint'>
                  {t(hint)}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className='download-type-dialog--footer'>
          <Button onClick={onClose}>
            {t('download.cancel')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

DownloadTypeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    hint: PropTypes.string,
    id: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
}

export default memo(DownloadTypeDialog)
