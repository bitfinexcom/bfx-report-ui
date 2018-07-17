import React, { Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'

export const Loading = ({ intl, title }) => (
  <Fragment>
    <h4>
      {intl.formatMessage({ id: title })}
    </h4>
    <div>
      {intl.formatMessage({ id: 'loading' })}
    </div>
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
