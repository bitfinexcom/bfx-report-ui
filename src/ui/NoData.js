import React, { Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'

export const NoData = ({ intl, title, descId }) => {
  const renderTitle = title ? (
    <h4>
      {intl.formatMessage({ id: title })}
    </h4>
  ) : ''
  const id = descId || 'nodata'
  return (
    <Fragment>
      {renderTitle}
      <div>
        {intl.formatMessage({ id })}
      </div>
    </Fragment>
  )
}

NoData.propTypes = {
  descId: PropTypes.string,
  intl: intlShape.isRequired,
  title: PropTypes.string,
}

NoData.defaultProps = {
  descId: undefined,
  title: '',
}

export default injectIntl(NoData)
