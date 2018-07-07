import React, { PureComponent } from 'react'
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
import { formatTime } from 'state/utils'
import { propTypes, defaultProps } from './Ledgers.props'

class Ledgers extends PureComponent {
  state = {
    currency: ''
  }

  const mtsCellRenderer = rowIndex => (
    <Cell>
      <TruncatedFormat>{formatTime(entries[rowIndex].mts)}</TruncatedFormat>
    </Cell>
  )

  handleClick(currency) {
    this.setState({ currency })
  }

  render() {
    const  { currencies, entries, intl } = this.props
    const { currency } = this.state
    const filteredData = entries.filter(entry => entry.currency === currency)
    const numRows = filteredData.length
    const idCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].id}</Cell>

    const descriptionCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].description}</Cell>

    const mtsCellRenderer = rowIndex => (
      <Cell>
        <TruncatedFormat>{new Date(filteredData[rowIndex].mts).toLocaleString()}</TruncatedFormat>
      </Cell>
    )

    const currencyCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].currency}</Cell>

    const amountCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].amount}</Cell>

    const balanceCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].balance}</Cell>

    const currencyButtons = currencies.map(symbol => (
      <Button intent={currency === symbol ? Intent.PRIMARY : Intent.NONE} onClick={() => this.handleClick(symbol)}>
        {symbol}
      </Button>))
    return (
      <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <h5>{intl.formatMessage({ id: 'ledgers.title' })} <Button icon='cloud-download' disabled>{intl.formatMessage({ id: 'timeframe.download' })}</Button></h5>
        {currencyButtons}
        <Table className='bitfinex-table' numRows={numRows} enableRowHeader={false}>
          <Column id='id' name='#' cellRenderer={idCellRenderer} />
          <Column id='description' name={intl.formatMessage({ id: 'ledgers.column.description' })} cellRenderer={descriptionCellRenderer} />
          <Column id='mts' name={intl.formatMessage({ id: 'ledgers.column.time' })} cellRenderer={mtsCellRenderer} />
          <Column id='currency' name={intl.formatMessage({ id: 'ledgers.column.currency' })} cellRenderer={currencyCellRenderer} />
          <Column id='amount' name={intl.formatMessage({ id: 'ledgers.column.amount' })} cellRenderer={amountCellRenderer} />
          <Column id='balance' name={intl.formatMessage({ id: 'ledgers.column.balance' })} cellRenderer={balanceCellRenderer} />
        </Table>
      </Card>
    )
  }
}

Ledgers.propTypes = propTypes
Ledgers.defaultProps = defaultProps

export default injectIntl(Ledgers)
