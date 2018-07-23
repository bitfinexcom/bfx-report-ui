import React, { Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import { Spinner } from '@blueprintjs/core'

export const Loading = ({ intl, title }) => (
  <Fragment>
    <h4>
      {intl.formatMessage({ id: title })}
    </h4>
    <Spinner size={Spinner.SIZE_SMALL} />
  </Fragment>
)

Loading.propTypes = {
  intl: intlShape.isRequired,
  title: PropTypes.string,
}

Loading.defaultProps = {
  title: '',
}

export default injectIntl(Loading)
