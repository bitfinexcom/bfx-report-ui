import React, { createRef, Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, Spinner } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import QueryLimitSelector from 'ui/QueryLimitSelector'
import { canChangeQueryLimit, getPageSize } from 'state/query/utils'

import { propTypes, defaultProps } from './Pagination.props'

class Pagination extends PureComponent {
  pageInput = createRef()

  componentDidUpdate() {
    this.pageInput.current.value = ''
  }

  getCurrentPage = () => parseInt(this.pageInput.current.placeholder || 1, 10)

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const { jumpPage, target, limit } = this.props
      const pageLen = parseInt(this.pageInput.current.dataset.pagelen || 1, 10)
      const page = Math.abs(parseInt(this.pageInput.current.value || 1, 10))
      jumpPage(target, page < pageLen ? page : pageLen, limit)
    }
  }

  backward = () => {
    const { target, limit, jumpPage } = this.props
    const page = this.getCurrentPage()
    jumpPage(target, page - 1, limit)
  }

  forward = () => {
    const { target, limit, jumpPage } = this.props
    const page = this.getCurrentPage()
    jumpPage(target, page + 1, limit)
  }

  jumpToFirstPage = () => {
    const { target, limit, jumpPage } = this.props
    jumpPage(target, 1, limit)
  }

  fetchNext = () => {
    const { target, limit, fetchNext } = this.props
    fetchNext(target, limit)
  }

  render() {
    const {
      entriesSize,
      limit,
      loading,
      nextPage = false,
      offset,
      pageOffset,
      t,
      target,
    } = this.props

    const PAGE_SIZE = getPageSize(target)
    const PAGE_GAP = limit / PAGE_SIZE
    const pageLen = Math.ceil(entriesSize / PAGE_SIZE)
    let pageBase
    if (offset < limit) {
      pageBase = 0
    } else if (offset % limit === 0) {
      pageBase = (offset - limit) / limit * PAGE_GAP
    } else {
      pageBase = Math.floor(offset / limit) * PAGE_GAP
    }
    const currentPageBase = (pageBase % PAGE_GAP === 0)
      ? pageBase + 1 : pageBase
    const currentPage = currentPageBase + pageOffset / PAGE_SIZE
    const renderRestDots = nextPage ? (
      <Fragment>
        <span>
          {'+'}
        </span>
        {' '}
      </Fragment>
    ) : ''

    const renderLoading = loading ? (
      <Fragment>
        <Spinner size={5} />
        {' '}
        <span className='bitfinex-show-soft'>
          {t('pagination.loading')}
        </span>
      </Fragment>
    ) : undefined

    return (
      <div className='pagination row center-xs'>
        <div className='bitfinex-pagination-group'>
          <Button
            minimal
            className='pagination-icon'
            icon={IconNames.DOUBLE_CHEVRON_LEFT}
            onClick={this.jumpToFirstPage}
            disabled={currentPage === 1 || loading}
          />
          <Button
            minimal
            className='pagination-icon'
            icon={IconNames.CHEVRON_LEFT}
            onClick={this.backward}
            disabled={currentPage - 1 === 0 || loading}
          />
          {t('pagination.page')}
          <input
            className='pagination-input'
            ref={this.pageInput}
            placeholder={currentPage}
            onKeyPress={this.handleKeyPress}
            data-pagelen={pageLen}
            disabled={loading}
          />
          {t('pagination.of')}
          {' '}
          {pageLen}
          {renderRestDots}
          <Button
            minimal
            className='pagination-icon'
            icon={IconNames.CHEVRON_RIGHT}
            onClick={this.forward}
            disabled={currentPage === pageLen || loading}
          />
          <Button
            minimal
            className='pagination-icon'
            rightIcon={IconNames.DOUBLE_CHEVRON_RIGHT}
            onClick={this.fetchNext}
            disabled={!nextPage || loading}
          />
          {canChangeQueryLimit(target) && <QueryLimitSelector target={target} />}
          {renderLoading}
        </div>
      </div>
    )
  }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

export default withTranslation('translations')(Pagination)
