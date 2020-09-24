import React, { createRef, Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Swipeable } from 'react-swipeable'
import { Spinner } from '@blueprintjs/core'

import Icon from 'icons'
import { getPageSize } from 'state/query/utils'

import { propTypes, defaultProps } from './Pagination.props'

class Pagination extends PureComponent {
  pageInput = createRef()

  componentDidUpdate() {
    if (this.pageInput.current) {
      this.pageInput.current.value = ''
    }
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

  onSwiped = (e) => {
    const { dir } = e
    const {
      entriesSize,
      loading,
      nextPage,
      page,
      target,
    } = this.props

    if (loading) {
      return
    }

    if (dir === 'Left') {
      const PAGE_SIZE = getPageSize(target)
      const pageLen = Math.ceil(entriesSize / PAGE_SIZE)

      if (page !== pageLen) {
        this.forward()
      } else if (nextPage) {
        this.fetchNext()
      }
    }

    if (dir === 'Right' && page !== 1) {
      this.backward()
    }
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

    if (pageLen === 1 && !nextPage) {
      return null
    }

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
      <Swipeable className='pagination' onSwiped={this.onSwiped} delta={50}>
        <div className='pagination-group'>
          <Icon.CHEVRON_DOUBLE_LEFT
            className={classNames('pagination-icon', { 'pagination-icon--disabled': page === 1 || loading })}
            onClick={this.jumpToFirstPage}
          />
          <Icon.CHEVRON_LEFT
            className={classNames('pagination-icon', { 'pagination-icon--disabled': page === 1 || loading })}
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
      </Swipeable>
    )
  }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

export default withTranslation('translations')(Pagination)
