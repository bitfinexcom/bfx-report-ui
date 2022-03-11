import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

const QueryButton = ({
  t,
  onClick,
  disabled,
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    intent={Intent.PRIMARY}
    className='query-button'
  >
    {t('query.title')}
  </Button>
)

QueryButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

QueryButton.defaultProps = {
  disabled: false,
}

export default withTranslation('translations')(memo(QueryButton))
