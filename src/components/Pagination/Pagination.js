import React, { createRef, Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Button, Spinner } from '@blueprintjs/core'

import { isValidateType } from 'state/utils'
import { getQueryLimit, getPageSize } from 'state/query/utils'

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
      loading,
      offset,
      nextClick,
      prevClick,
      pageOffset,
      nextPage = false,
    } = this.props
    if (!isValidateType(type)) {
      return ''
    }
    const LIMIT = getQueryLimit(type)
    const PAGE_SIZE = getPageSize(type)
    const PAGE_GAP = LIMIT / PAGE_SIZE
    const pageLen = Math.ceil(dataLen / PAGE_SIZE)
    let pageBase
    if (offset < LIMIT) {
      pageBase = 0
    } else if (offset % LIMIT === 0) {
      pageBase = (offset - LIMIT) / LIMIT * PAGE_GAP
    } else {
      pageBase = Math.floor(offset / LIMIT) * PAGE_GAP
    }
    const currentPageBase = (pageBase % PAGE_GAP === 0)
      ? pageBase + 1 : pageBase
    const currentPage = currentPageBase + pageOffset / PAGE_SIZE
    const renderRestDots = nextPage ? (
      <Fragment>
        <span>
          +
        </span>
        &nbsp;
      </Fragment>
    ) : ''

    const renderLoading = loading ? (
      <Fragment>
        <Spinner size={5} />
        &nbsp;
        <span className='bitfinex-show-soft'>
          {intl.formatMessage({ id: 'pagination.loading' })}
        </span>
      </Fragment>
    ) : undefined

    return (
      <div className='row center-xs'>
        <div className='bitfinex-pagination-group col-xs-12 col-sm-6'>
          <Button
            minimal
            icon='double-chevron-left'
            onClick={prevClick}
            disabled={offset <= LIMIT || loading}
          />
          <Button
            minimal
            icon='chevron-left'
            onClick={this.backward}
            disabled={currentPage - 1 === 0 || loading}
          />
          {intl.formatMessage({ id: 'pagination.page' })}
          <input
            className='bitfinex-page-input'
            ref={this.pageInput}
            placeholder={currentPage}
            onKeyPress={this.handleKeyPress}
            data-pagelen={pageLen}
            disabled={loading}
          />
          {intl.formatMessage({ id: 'pagination.of' })}
          &nbsp;
          {pageLen}
          {renderRestDots}
          <Button
            minimal
            icon='chevron-right'
            onClick={this.forward}
            disabled={currentPage === pageLen || loading}
          />
          <Button
            minimal
            rightIcon='double-chevron-right'
            onClick={nextClick}
            disabled={!nextPage || loading}
          />
          {renderLoading}
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
  dataLen: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func,
  offset: PropTypes.number.isRequired,
  nextClick: PropTypes.func,
  prevClick: PropTypes.func,
  pageOffset: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

Pagination.defaultProps = {
  jumpPage: () => {},
  nextClick: () => {},
  prevClick: () => {},
  loading: false,
  nextPage: false,
}

export default injectIntl(Pagination)
