import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'

const ExportButton = ({ intl, handleClickExport }) => (
  <Button icon='cloud-download' onClick={handleClickExport}>
    {intl.formatMessage({ id: 'timeframe.download' })}
  </Button>
)

ExportButton.propTypes = {
  intl: intlShape.isRequired,
  handleClickExport: PropTypes.func.isRequired,
}

ExportButton.defaultProps = {}

export default injectIntl(ExportButton)
