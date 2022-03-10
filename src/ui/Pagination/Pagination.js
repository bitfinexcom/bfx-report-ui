import React, { createRef, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Swipeable } from 'react-swipeable'
import { Spinner } from '@blueprintjs/core'

import Icon from 'icons'
import { getPageSize } from 'state/query/utils'

class Pagination extends PureComponent {
  static propTypes = {
    target: PropTypes.string.isRequired,
    entriesSize: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    page: PropTypes.number.isRequired,
    nextPage: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ]),
    jumpPage: PropTypes.func,
    fetchNext: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: false,
    nextPage: false,
    jumpPage: () => {},
  }

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
      page,
      target,
      loading,
      nextPage,
      entriesSize,
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
      t,
      page,
      target,
      loading,
      entriesSize,
      nextPage = false,
    } = this.props

    const PAGE_SIZE = getPageSize(target)
    const pageLen = Math.ceil(entriesSize / PAGE_SIZE)

    if (pageLen === 1 && !nextPage) {
      return null
    }

    const renderRestDots = nextPage ? (
      <>
        <span>
          {'+'}
        </span>
        {' '}
      </>
    ) : ''

    const renderLoading = loading ? (
      <span className='pagination-loading'>
        <Spinner size={6} />
      </span>
    ) : undefined

    return (
      <Swipeable
        delta={50}
        className='pagination'
        onSwiped={this.onSwiped}
      >
        <div className='pagination-group'>
          <Icon.CHEVRON_DOUBLE_LEFT
            onClick={this.jumpToFirstPage}
            className={classNames('pagination-icon', { 'pagination-icon--disabled': page === 1 || loading })}
          />
          <Icon.CHEVRON_LEFT
            onClick={this.backward}
            className={classNames('pagination-icon', { 'pagination-icon--disabled': page === 1 || loading })}
          />
          <span className='pagination-page'>
            {t('pagination.page')}
            <input
              disabled={loading}
              placeholder={page}
              ref={this.pageInput}
              data-pagelen={pageLen}
              className='pagination-input'
              onKeyPress={this.handleKeyPress}
            />
            {t('pagination.of')}
            {' '}
            {pageLen}
            {renderRestDots}
          </span>
          <Icon.CHEVRON_RIGHT
            onClick={this.forward}
            className={classNames('pagination-icon', { 'pagination-icon--disabled': page === pageLen || loading })}
          />
          <Icon.CHEVRON_DOUBLE_RIGHT
            onClick={this.fetchNext}
            className={classNames('pagination-icon', { 'pagination-icon--disabled': !nextPage || loading })}
          />
          {renderLoading}
        </div>
      </Swipeable>
    )
  }
}

export default withTranslation('translations')(Pagination)
