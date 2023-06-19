import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

const QueryButton = (props) => {
  const {
    disabled,
    onClick,
    t,
  } = props

  return (
    <Button
      className='query-button'
      onClick={onClick}
      intent={Intent.SUCCESS}
      disabled={disabled}
    >
      {t('query.title')}
    </Button>
  )
}

QueryButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

QueryButton.defaultProps = {
  disabled: false,
}

export default withTranslation('translations')(QueryButton)
