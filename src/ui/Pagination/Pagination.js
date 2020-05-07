import React, { createRef, Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Spinner } from '@blueprintjs/core'

import Icon from 'icons'
import { getPageSize } from 'state/query/utils'

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
      <span className='pagination-loading'>
        <Spinner size={6} />
      </span>
    ) : undefined

    return (
      <div className='pagination'>
        <div className='pagination-group'>
          <Icon.CHEVRON_DOUBLE_LEFT
            className={classNames('pagination-icon', { 'pagination-icon--disabled': page === 1 || loading })}
            onClick={this.jumpToFirstPage}
          />
          <Icon.CHEVRON_LEFT
            className={classNames('pagination-icon', { 'pagination-icon--disabled': page - 1 === 0 || loading })}
            onClick={this.backward}
          />
          <span className='pagination-page'>
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
          </span>
          <Icon.CHEVRON_RIGHT
            className={classNames('pagination-icon', { 'pagination-icon--disabled': page === pageLen || loading })}
            onClick={this.forward}
          />
          <Icon.CHEVRON_DOUBLE_RIGHT
            className={classNames('pagination-icon', { 'pagination-icon--disabled': !nextPage || loading })}
            onClick={this.fetchNext}
          />
          {renderLoading}
        </div>
      </div>
    )
  }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

export default withTranslation('translations')(Pagination)
