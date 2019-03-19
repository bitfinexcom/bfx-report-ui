import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

export const NoData = ({ descId, t, title }) => {
  const renderTitle = title ? (
    <h4>
      {t(title)}
    </h4>
  ) : ''
  const id = descId || 'nodata'
  return (
    <Fragment>
      {renderTitle}
      <div>
        {t(id)}
      </div>
    </Fragment>
  )
}

NoData.propTypes = {
  descId: PropTypes.string,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
}

NoData.defaultProps = {
  descId: undefined,
  title: '',
}

export default withTranslation('translations')(NoData)
