import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Intent } from '@blueprintjs/core'
import { isValidateType } from 'state/utils'
import queryConstants from 'state/query/constants'

class Pagination extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(page) {
    if (!this.handlers[page]) {
      this.handlers[page] = () => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.jumpPage(page)
      }
    }
    return this.handlers[page]
  }

  render() {
    const {
      type,
      dataLen,
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
    const currentPage = Math.floor((offset + pageOffset - LIMIT) / PAGE_SIZE) + 1
    const pages = []
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= pageLen; i++) {
      pages.push(
        <Button
          key={`page${i}`}
          intent={currentPage === i ? Intent.PRIMARY : Intent.NONE}
          onClick={this.handleClick(i)}
        >
          {i}
        </Button>,
      )
    }
    const renderPages = (
      <Fragment>
        {pages}
      </Fragment>
    )

    const renderRestDots = !nextCondition ? (
      <Fragment>
        <span>
...
        </span>
        &nbsp;
      </Fragment>
    ) : ''

    return (
      <div className='bitfinex-pagination-group'>
        <Button
          icon='double-chevron-left'
          onClick={prevClick}
          disabled={prevCondition}
        />
        {renderPages}
        {renderRestDots}
        <Button
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

export default Pagination
