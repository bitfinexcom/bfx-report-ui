import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Button } from '@blueprintjs/core'
import { isValidateType } from 'state/utils'
import queryConstants from 'state/query/constants'

class Pagination extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      const page = parseInt(this.pageInput.value || 1, 10)
      // eslint-disable-next-line react/destructuring-assignment
      this.props.jumpPage(page)
    }
  }

  render() {
    const {
      type,
      dataLen,
      intl,
      offset,
      nextClick,
      prevClick,
      pageOffset,
    } = this.props
    if (!isValidateType(type)) {
      return ''
    }
    const LIMIT = queryConstants[`DEFAULT_${type.toUpperCase()}_QUERY_LIMIT`]
    const PAGE_SIZE = queryConstants[`DEFAULT_${type.toUpperCase()}_PAGE_SIZE`]
    const pageLen = Math.ceil(dataLen / PAGE_SIZE)
    const nextCondition = dataLen % LIMIT !== 0 && dataLen - LIMIT < offset
    const prevCondition = offset <= LIMIT
    const currentPage = offset + pageOffset < LIMIT
      ? Math.floor((offset + pageOffset) / PAGE_SIZE) + 1
      : Math.floor((offset + pageOffset - LIMIT) / PAGE_SIZE) + 1

    const renderRestDots = !nextCondition ? (
      <Fragment>
        <span>
          +
        </span>
        &nbsp;
      </Fragment>
    ) : ''

    return (
      <div className='bitfinex-pagination-group'>
        <Button
          minimal
          icon='double-chevron-left'
          onClick={prevClick}
          disabled={prevCondition}
        />
        {intl.formatMessage({ id: 'pagination.page' })}
        <input
          className='bitfinex-page-input'
          ref={(ref) => {
            this.pageInput = ref
          }}
          placeholder={currentPage}
          onKeyPress={this.handleKeyPress}
        />
        {intl.formatMessage({ id: 'pagination.of' })}
        &nbsp;
        {pageLen}
        {renderRestDots}
        <Button
          minimal
          rightIcon='double-chevron-right'
          onClick={nextClick}
          disabled={nextCondition}
        />
      </div>
    )
  }
}

Pagination.propTypes = {
  dataLen: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func,
  offset: PropTypes.number.isRequired,
  nextClick: PropTypes.func,
  prevClick: PropTypes.func,
  pageOffset: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}

Pagination.defaultProps = {
  jumpPage: () => {},
  nextClick: () => {},
  prevClick: () => {},
}

export default injectIntl(Pagination)
