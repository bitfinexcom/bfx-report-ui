import React, { Fragment, PureComponent } from 'react'
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
import Loading from 'components/Loading'
import NoData from 'components/NoData'
import { formatTime } from 'state/utils'
import { propTypes, defaultProps } from './Orders.props'

const COLUMN_WIDTHS = [80, 70, 150, 100, 100, 100, 100, 150, 200]

class Orders extends PureComponent {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchOrders()
  }

  componentDidUpdate(prevProps) {
    const { loading, fetchOrders } = this.props
    const { prevLoading } = prevProps
    if (loading && loading !== prevLoading) {
      fetchOrders()
    }
  }

  render() {
    const {
      entries,
      intl,
      loading,
    } = this.props
    const numRows = entries.length

    const idCellRenderer = rowIndex => (
      <Cell wrapText={false}>
        {entries[rowIndex].id}
      </Cell>
    )

    const pairCellRenderer = rowIndex => (
      <Cell>
        {entries[rowIndex].pair}
      </Cell>
    )

    const typeCellRenderer = rowIndex => (
      <Cell>
        {entries[rowIndex].type}
      </Cell>
    )

    const amountOrigCellRenderer = rowIndex => (
      <Cell>
        {entries[rowIndex].amountOrig}
      </Cell>
    )

    const amountCellRenderer = rowIndex => (
      <Cell>
        {entries[rowIndex].amount}
      </Cell>
    )

    const priceCellRenderer = rowIndex => (
      <Cell>
        {entries[rowIndex].price}
      </Cell>
    )

    const priceAvgCellRenderer = rowIndex => (
      <Cell>
        {entries[rowIndex].priceAvg}
      </Cell>
    )

    const mtsUpdateCellRenderer = rowIndex => (
      <Cell>
        <TruncatedFormat>
          {formatTime(entries[rowIndex].mtsUpdate)}
        </TruncatedFormat>
      </Cell>
    )

    const statusCellRenderer = rowIndex => (
      <Cell>
        {entries[rowIndex].status}
      </Cell>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='orders.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <NoData title='orders.title' />
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'orders.title' })}
            &nbsp;
            <Button icon='cloud-download' disabled>
              {intl.formatMessage({ id: 'timeframe.download' })}
            </Button>
          </h4>
          <Table
            className='bitfinex-table'
            numRows={numRows}
            enableRowHeader={false}
            columnWidths={COLUMN_WIDTHS}
          >
            <Column
              id='id'
              name='#'
              cellRenderer={idCellRenderer}
            />
            <Column
              id='symbol'
              name={intl.formatMessage({ id: 'orders.column.pair' })}
              cellRenderer={pairCellRenderer}
            />
            <Column
              id='type'
              name={intl.formatMessage({ id: 'orders.column.type' })}
              cellRenderer={typeCellRenderer}
            />
            <Column
              id='amount'
              name={intl.formatMessage({ id: 'orders.column.amount' })}
              cellRenderer={amountCellRenderer}
            />
            <Column
              id='amountOrig'
              name={intl.formatMessage({ id: 'orders.column.amount-orig' })}
              cellRenderer={amountOrigCellRenderer}
            />
            <Column
              id='price'
              name={intl.formatMessage({ id: 'orders.column.price' })}
              cellRenderer={priceCellRenderer}
            />
            <Column
              id='priceAvg'
              name={intl.formatMessage({ id: 'orders.column.avgprice' })}
              cellRenderer={priceAvgCellRenderer}
            />
            <Column
              id='mtsUpdate'
              name={intl.formatMessage({ id: 'orders.column.update' })}
              cellRenderer={mtsUpdateCellRenderer}
            />
            <Column
              id='status'
              name={intl.formatMessage({ id: 'orders.column.status' })}
              cellRenderer={statusCellRenderer}
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

Orders.propTypes = propTypes
Orders.defaultProps = defaultProps

export default injectIntl(Orders)
