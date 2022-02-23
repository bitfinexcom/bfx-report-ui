import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

const ExportButton = ({ toggleDialog, t }) => (
  <Button icon={IconNames.CLOUD_DOWNLOAD} onClick={toggleDialog}>
    {t('download.export')}
  </Button>
)

ExportButton.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(ExportButton)
