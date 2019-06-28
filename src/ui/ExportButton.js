import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

const ExportButton = ({ handleClickExport, t }) => (
  <Button icon={IconNames.CLOUD_DOWNLOAD} onClick={handleClickExport}>
    {t('download.export')}
  </Button>
)

ExportButton.propTypes = {
  handleClickExport: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ExportButton.defaultProps = {}

export default withTranslation('translations')(ExportButton)
