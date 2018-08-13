import React, { createRef, Fragment, PureComponent } from 'react'
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
    this.backward = this.backward.bind(this)
    this.forward = this.forward.bind(this)
    this.pageInput = createRef()
  }

  componentDidUpdate() {
    this.pageInput.current.value = ''
  }

  getCurrentPage() {
    return parseInt(this.pageInput.current.placeholder || 1, 10)
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      const pageLen = parseInt(this.pageInput.current.dataset.pagelen || 1, 10)
      const page = Math.abs(parseInt(this.pageInput.current.value || 1, 10))
      // eslint-disable-next-line react/destructuring-assignment
      this.props.jumpPage(page < pageLen ? page : pageLen)
    }
  }

  backward() {
    const page = this.getCurrentPage()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.jumpPage(page - 1)
  }

  forward() {
    const page = this.getCurrentPage()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.jumpPage(page + 1)
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
    const pageBase = offset + pageOffset < LIMIT
      ? 0 : Math.floor(offset - LIMIT / PAGE_SIZE)
    const currentPageBase = pageBase === 0 ? 1 : pageBase
    const currentPage = currentPageBase + pageOffset / PAGE_SIZE
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
        <Button
          minimal
          icon='chevron-left'
          onClick={this.backward}
          disabled={currentPage - 1 === 0}
        />
        {intl.formatMessage({ id: 'pagination.page' })}
        <input
          className='bitfinex-page-input'
          ref={this.pageInput}
          placeholder={currentPage}
          onKeyPress={this.handleKeyPress}
          data-pagelen={pageLen}
        />
        {intl.formatMessage({ id: 'pagination.of' })}
        &nbsp;
        {pageLen}
        {renderRestDots}
        <Button
          minimal
          icon='chevron-right'
          onClick={this.forward}
          disabled={currentPage === pageLen}
        />
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
