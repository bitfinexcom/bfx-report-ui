import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'

export const Pagination = ({
  intl, prevClick, prevCondition, nextClick, nextCondition,
}) => (
  <div className='bitfinex-pagination-group'>
    <Button
      icon='chevron-left'
      onClick={prevClick}
      disabled={prevCondition}
    >
      {intl.formatMessage({ id: 'pagination.prev' })}
    </Button>
    <Button
      rightIcon='chevron-right'
      onClick={nextClick}
      disabled={nextCondition}
    >
      {intl.formatMessage({ id: 'pagination.next' })}
    </Button>
  </div>
)

Pagination.propTypes = {
  intl: intlShape.isRequired,
  prevClick: PropTypes.func,
  prevCondition: PropTypes.bool,
  nextClick: PropTypes.func,
  nextCondition: PropTypes.bool,
}

Pagination.defaultProps = {
  prevClick: () => {},
  prevCondition: false,
  nextClick: () => {},
  nextCondition: false,
}

export default injectIntl(Pagination)
