import React, { createRef, Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import { Button, Spinner } from '@blueprintjs/core'

import QueryLimitSelector from 'ui/QueryLimitSelector'
import { isValidateType } from 'state/utils'
import { canChangeQueryLimit, getPageSize } from 'state/query/utils'

import { propTypes, defaultProps } from './Pagination.props'

class Pagination extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.backward = this.backward.bind(this)
    this.forward = this.forward.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
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
      const { getQueryLimit, jumpPage, type } = this.props
      const limit = getQueryLimit(type)
      const pageLen = parseInt(this.pageInput.current.dataset.pagelen || 1, 10)
      const page = Math.abs(parseInt(this.pageInput.current.value || 1, 10))
      jumpPage(page < pageLen ? page : pageLen, limit)
    }
  }

  backward() {
    const { getQueryLimit, jumpPage, type } = this.props
    const page = this.getCurrentPage()
    const limit = getQueryLimit(type)
    jumpPage(page - 1, limit)
  }

  forward() {
    const { getQueryLimit, jumpPage, type } = this.props
    const page = this.getCurrentPage()
    const limit = getQueryLimit(type)
    jumpPage(page + 1, limit)
  }

  fetchNext() {
    const { getQueryLimit, nextClick, type } = this.props
    const limit = getQueryLimit(type)
    nextClick(limit)
  }

  render() {
    const {
      type,
      dataLen,
      getQueryLimit,
      intl,
      loading,
      offset,
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

    const renderQueryLimitSelector = canChangeQueryLimit(type)
      ? (
        <QueryLimitSelector
          target={type}
        />
      )
      : undefined

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
            onClick={this.fetchNext}
            disabled={!nextPage || loading}
          />
          {renderQueryLimitSelector}
          {renderLoading}
        </div>
      </div>
    )
  }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

export default injectIntl(Pagination)
