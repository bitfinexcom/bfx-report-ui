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
import { formatTime } from 'state/utils'
import { propTypes, defaultProps } from './Ledgers.props'

class Ledgers extends PureComponent {
  state = {
    currency: '',
  }

  handleClick(currency) {
    this.setState({ currency })
  }

  render() {
    const {
      currencies, entries, intl, loading,
    } = this.props
    const currency = this.state.currency || currencies[0]
    const filteredData = entries.filter(entry => entry.currency === currency)
    const numRows = filteredData.length

    const descriptionCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].description}</Cell>

    const mtsCellRenderer = rowIndex => (
      <Cell>
        <TruncatedFormat>{formatTime(filteredData[rowIndex].mts)}</TruncatedFormat>
      </Cell>
    )

    const creditCellRenderer = rowIndex => <Cell className='bitfinex-green-text'>{parseFloat(filteredData[rowIndex].amount) > 0 ? filteredData[rowIndex].amount : ''}</Cell>

    const debitCellRenderer = rowIndex => <Cell className='bitfinex-red-text'>{parseFloat(filteredData[rowIndex].amount) < 0 ? parseFloat(filteredData[rowIndex].amount) * -1 : ''}</Cell>

    const balanceCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].balance}</Cell>

    const currencyButtons = currencies.map(symbol => (
      <Button key={symbol} intent={currency === symbol ? Intent.PRIMARY : Intent.NONE} onClick={() => this.handleClick(symbol)}>
        {symbol}
      </Button>))

    let showContent
    if (loading) {
      showContent = (
        <Fragment>
          <h2>{intl.formatMessage({ id: 'ledgers.title' })}</h2>
          <div>{intl.formatMessage({ id: 'loading' })}</div>
        </Fragment>
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h2>{intl.formatMessage({ id: 'ledgers.title' })}</h2>
          <div>{intl.formatMessage({ id: 'nodata' })}</div>
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h2>{intl.formatMessage({ id: 'ledgers.title' })} <Button icon='cloud-download' disabled>{intl.formatMessage({ id: 'timeframe.download' })}</Button></h2>
          <div className='bitfinex-symbol-group'>{currencyButtons}</div>
          <Table className='bitfinex-table' numRows={numRows} enableRowHeader={false} columnWidths={[500, 120, 120, 120, 150]}>
            <Column id='description' name={intl.formatMessage({ id: 'ledgers.column.description' })} cellRenderer={descriptionCellRenderer} />
            <Column id='credit' name={intl.formatMessage({ id: 'ledgers.column.credit' })} cellRenderer={creditCellRenderer} />
            <Column id='debit' name={intl.formatMessage({ id: 'ledgers.column.debit' })} cellRenderer={debitCellRenderer} />
            <Column id='balance' name={intl.formatMessage({ id: 'ledgers.column.balance' })} cellRenderer={balanceCellRenderer} />
            <Column id='mts' name={intl.formatMessage({ id: 'ledgers.column.time' })} cellRenderer={mtsCellRenderer} />
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
