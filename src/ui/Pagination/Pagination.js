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
      const { jumpPage, target } = this.props
      const pageLen = parseInt(this.pageInput.current.dataset.pagelen || 1, 10)
      const page = Math.abs(parseInt(this.pageInput.current.value || 1, 10))
      jumpPage(target, page < pageLen ? page : pageLen)
    }
  }

  backward = () => {
    const { target, jumpPage } = this.props
    const page = this.getCurrentPage()
    jumpPage(target, page - 1)
  }

  forward = () => {
    const { target, jumpPage } = this.props
    const page = this.getCurrentPage()
    jumpPage(target, page + 1)
  }

  jumpToFirstPage = () => {
    const { target, jumpPage } = this.props
    jumpPage(target, 1)
  }

  fetchNext = () => {
    const { target, fetchNext } = this.props
    fetchNext(target)
  }

  render() {
    const {
      entriesSize,
      loading,
      nextPage = false,
      t,
      target,
      page,
    } = this.props

    const PAGE_SIZE = getPageSize(target)
    const pageLen = Math.ceil(entriesSize / PAGE_SIZE)

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
            disabled={page === 1 || loading}
          />
          <Button
            minimal
            className='pagination-icon'
            icon={IconNames.CHEVRON_LEFT}
            onClick={this.backward}
            disabled={page - 1 === 0 || loading}
          />
          {t('pagination.page')}
          <input
            className='pagination-input'
            ref={this.pageInput}
            placeholder={page}
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
            disabled={page === pageLen || loading}
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
