import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

const ExportButton = ({ toggleDialog }) => {
  const { t } = useTranslation()
  return (
    <Button icon={IconNames.CLOUD_DOWNLOAD} onClick={toggleDialog}>
      {t('download.export')}
    </Button>
  )
}

ExportButton.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
}

export default ExportButton
