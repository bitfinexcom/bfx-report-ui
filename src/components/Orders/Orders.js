import React, { Fragment } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Card,
  Elevation,
} from '@blueprintjs/core'
import {
  Cell,
  Column,
  Table,
  TruncatedFormat,
} from '@blueprintjs/table'
import { formatTime } from 'state/utils'
import { propTypes, defaultProps } from './Orders.props'

export const Orders = ({ entries, intl, loading }) => {
  const numRows = entries.length
  const idCellRenderer = rowIndex => <Cell wrapText={false}>{entries[rowIndex].id}</Cell>

  const symbolCellRenderer = rowIndex => <Cell>{entries[rowIndex].symbol}</Cell>

  const typeCellRenderer = rowIndex => <Cell>{entries[rowIndex].type}</Cell>

  const amountOrigCellRenderer = rowIndex => <Cell>{entries[rowIndex].amountOrig}</Cell>

  const amountCellRenderer = rowIndex => <Cell>{entries[rowIndex].amount}</Cell>

  const priceCellRenderer = rowIndex => <Cell>{entries[rowIndex].price}</Cell>

  const priceAvgCellRenderer = rowIndex => <Cell>{entries[rowIndex].priceAvg}</Cell>

  const mtsUpdateCellRenderer = rowIndex => (
    <Cell>
      <TruncatedFormat>{formatTime(entries[rowIndex].mtsUpdate)}</TruncatedFormat>
    </Cell>
  )

  const statusCellRenderer = rowIndex => <Cell>{entries[rowIndex].status}</Cell>

  let showContent
  if (loading) {
    showContent = (
      <Fragment>
        <h2>{intl.formatMessage({ id: 'orders.title' })}</h2>
        <div>{intl.formatMessage({ id: 'loading' })}</div>
      </Fragment>
    )
  } else if (numRows === 0) {
    showContent = (
      <Fragment>
        <h2>{intl.formatMessage({ id: 'orders.title' })}</h2>
        <div>{intl.formatMessage({ id: 'nodata' })}</div>
      </Fragment>
    )
  } else {
    showContent = (
      <Fragment>
        <h2>{intl.formatMessage({ id: 'orders.title' })} <Button icon='cloud-download' disabled>{intl.formatMessage({ id: 'timeframe.download' })}</Button></h2>
        <Table className='bitfinex-table' numRows={numRows} enableRowHeader={false} columnWidths={[80, 70, 150, 100, 100, 100, 100, 150, 200]}>
          <Column id='id' name='#' cellRenderer={idCellRenderer} />
          <Column id='symbol' name={intl.formatMessage({ id: 'orders.column.pair' })} cellRenderer={symbolCellRenderer} />
          <Column id='type' name={intl.formatMessage({ id: 'orders.column.type' })} cellRenderer={typeCellRenderer} />
          <Column id='amountOrig' name={intl.formatMessage({ id: 'orders.column.amount-orig' })} cellRenderer={amountOrigCellRenderer} />
          <Column id='amount' name={intl.formatMessage({ id: 'orders.column.amount' })} cellRenderer={amountCellRenderer} />
          <Column id='price' name={intl.formatMessage({ id: 'orders.column.price' })} cellRenderer={priceCellRenderer} />
          <Column id='priceAvg' name={intl.formatMessage({ id: 'orders.column.avgprice' })} cellRenderer={priceAvgCellRenderer} />
          <Column id='mtsUpdate' name={intl.formatMessage({ id: 'orders.column.update' })} cellRenderer={mtsUpdateCellRenderer} />
          <Column id='status' name={intl.formatMessage({ id: 'orders.column.status' })} cellRenderer={statusCellRenderer} />
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

Orders.propTypes = propTypes
Orders.defaultProps = defaultProps

export default injectIntl(Orders)
