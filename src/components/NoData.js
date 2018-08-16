import React, { Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'

export const NoData = ({ intl, title }) => {
  const renderTitle = title ? (
    <h4>
      {intl.formatMessage({ id: title })}
    </h4>
  ) : ''
  return (
    <Fragment>
      {renderTitle}
      <div>
        {intl.formatMessage({ id: 'nodata' })}
      </div>
    </Fragment>
  )
}

NoData.propTypes = {
  intl: intlShape.isRequired,
  title: PropTypes.string,
}

NoData.defaultProps = {
  title: '',
}

export default injectIntl(NoData)
