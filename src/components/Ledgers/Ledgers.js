import React, { PureComponent, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Card,
  Elevation,
  Intent,
} from '@blueprintjs/core'
import {
  Cell,
  Column,
  Table,
  TruncatedFormat,
} from '@blueprintjs/table'
import Loading from 'components/Loading'
import NoData from 'components/NoData'
import { formatTime } from 'state/utils'
import { propTypes, defaultProps } from './Ledgers.props'

const COLUMN_WIDTHS = [500, 120, 120, 120, 150]

class Ledgers extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    symbol: '',
  }

  handleClick(symbol) {
    if (!this.handlers[symbol]) {
      this.handlers[symbol] = () => {
        this.setState({ symbol })
      }
    }
    return this.handlers[symbol]
  }

  render() {
    const {
      currencies,
      entries,
      intl,
      loading,
    } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    const currency = this.state.symbol || currencies[0]
    const filteredData = entries.filter(entry => entry.currency === currency)
    const numRows = filteredData.length

    const descriptionCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].description}
      </Cell>
    )

    const mtsCellRenderer = rowIndex => (
      <Cell>
        <TruncatedFormat>
          {formatTime(filteredData[rowIndex].mts)}
        </TruncatedFormat>
      </Cell>
    )

    const creditCellRenderer = rowIndex => (
      <Cell className='bitfinex-green-text'>
        {parseFloat(filteredData[rowIndex].amount) > 0 ? filteredData[rowIndex].amount : ''}
      </Cell>
    )

    const debitCellRenderer = rowIndex => (
      <Cell className='bitfinex-red-text'>
        {parseFloat(filteredData[rowIndex].amount) < 0 ? Math.abs(filteredData[rowIndex].amount) : ''}
      </Cell>
    )

    const balanceCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].balance}
      </Cell>
    )

    const currencyButtons = currencies.map(symbol => (
      <Button
        key={symbol}
        intent={currency === symbol ? Intent.PRIMARY : Intent.NONE}
        onClick={this.handleClick(symbol)}
      >
        {symbol}
      </Button>))

    let showContent
    if (loading) {
      showContent = (
        <Loading title='ledgers.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <NoData title='ledgers.title' />
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'ledgers.title' })}
            &nbsp;
            <Button icon='cloud-download' disabled>
              {intl.formatMessage({ id: 'timeframe.download' })}
            </Button>
          </h4>
          <div className='bitfinex-symbol-group'>
            {currencyButtons}
          </div>
          <Table
            className='bitfinex-table'
            numRows={numRows}
            enableRowHeader={false}
            columnWidths={COLUMN_WIDTHS}
          >
            <Column
              id='description'
              name={intl.formatMessage({ id: 'ledgers.column.description' })}
              cellRenderer={descriptionCellRenderer}
            />
            <Column
              id='credit'
              name={intl.formatMessage({ id: 'ledgers.column.credit' })}
              cellRenderer={creditCellRenderer}
            />
            <Column
              id='debit'
              name={intl.formatMessage({ id: 'ledgers.column.debit' })}
              cellRenderer={debitCellRenderer}
            />
            <Column
              id='balance'
              name={intl.formatMessage({ id: 'ledgers.column.balance' })}
              cellRenderer={balanceCellRenderer}
            />
            <Column
              id='mts'
              name={intl.formatMessage({ id: 'ledgers.column.time' })}
              cellRenderer={mtsCellRenderer}
            />
          </Table>
        </Fragment>
      )
    }
    return (
      <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {showContent}
      </Card>
    )
  }
}

Ledgers.propTypes = propTypes
Ledgers.defaultProps = defaultProps

export default injectIntl(Ledgers)
