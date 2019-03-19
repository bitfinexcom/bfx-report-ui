import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Spinner } from '@blueprintjs/core'

export const Loading = ({ t, title }) => {
  const renderTitle = title ? (
    <h4>
      {t(title)}
    </h4>
  ) : ''
  return (
    <Fragment>
      {renderTitle}
      <Spinner size={Spinner.SIZE_SMALL} />
    </Fragment>
  )
}

Loading.propTypes = {
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
}

Loading.defaultProps = {
  title: '',
}

export default withTranslation('translations')(Loading)
