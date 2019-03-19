import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'

const ExportButton = ({ handleClickExport, t }) => (
  <Button icon='cloud-download' onClick={handleClickExport}>
    {t('timeframe.download.export')}
  </Button>
)

ExportButton.propTypes = {
  handleClickExport: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ExportButton.defaultProps = {}

export default withTranslation('translations')(ExportButton)
