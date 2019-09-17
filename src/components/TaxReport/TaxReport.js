import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Card,
  Elevation,
  Intent,
  Position,
  Tooltip,
} from '@blueprintjs/core'
import _isNumber from 'lodash/isNumber'

import DateInput from 'ui/DateInput'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import RefreshButton from 'ui/RefreshButton'
import DataTable from 'ui/DataTable'
import NoData from 'ui/NoData'
import { isValidTimeStamp } from 'state/query/utils'
import getMovementsColumns from 'components/Movements/Movements.columns'
import { getFrameworkPositionsColumns, getPositionsTickersColumns } from 'utils/columns'

import { propTypes } from './TaxReport.props'
import getTotalWinLossColumns from './TotalWinLoss.columns'
import getTotalMovementsColumns from './TotalMovements.columns'

class TaxReport extends PureComponent {
  constructor(props) {
    super(props)

    const { params: { start, end } } = props
    this.state = {
      start: start && new Date(start),
      end: end && new Date(end),
    }
  }

  componentDidMount() {
    const { loading, fetchTaxReport } = this.props
    if (loading) {
      fetchTaxReport()
    }
  }

  handleDateChange = (input, time) => {
    const timestamp = time && time.getTime()
    if (isValidTimeStamp(timestamp) || time === null) {
      this.setState({ [input]: time || null })
    }
  }

  handleQuery = () => {
    const { fetchTaxReport } = this.props
    const { start, end } = this.state
    const params = {
      start: start ? start.getTime() : undefined,
      end: end ? end.getTime() : undefined,
    }
    fetchTaxReport(params)
  }

  hasNewTime = () => {
    const { params } = this.props
    const { start: currStart, end: currEnd } = params
    const { start, end } = this.state
    const isDiffStart = start ? start.getTime() !== currStart : !!start !== !!currStart
    const isDiffEnd = end ? end.getTime() !== currEnd : !!end !== !!currEnd
    return isDiffStart || isDiffEnd
  }

  getPositions = (positions, tickers, title) => {
    const {
      getFullTime,
      timeOffset,
      t,
    } = this.props

    if (!positions.length) {
      return null
    }

    const positionsColumns = getFrameworkPositionsColumns({
      filteredData: positions,
      getFullTime,
      t,
      timeOffset,
    })

    let renderTickers
    if (tickers.length) {
      const tickersColumns = getPositionsTickersColumns({ filteredData: tickers })

      renderTickers = (
        <Fragment>
          <h4>
            {t('taxreport.tickers')}
          </h4>
          <DataTable
            numRows={tickers.length}
            tableColums={tickersColumns}
          />
        </Fragment>
      )
    }

    return (
      <Fragment>
        <h4>
          {title}
        </h4>
        <DataTable
          numRows={positions.length}
          tableColums={positionsColumns}
        />
        {renderTickers}
      </Fragment>
    )
  }

  getMovements = () => {
    const {
      data,
      getFullTime,
      timeOffset,
      t,
    } = this.props
    const {
      movementsEntries,
      depositsTotalAmount,
      withdrawalsTotalAmount,
      movementsTotalAmount,
    } = data

    if (!movementsEntries.length) {
      return null
    }

    const movementsColumns = getMovementsColumns({
      filteredData: movementsEntries,
      getFullTime,
      t,
      timeOffset,
    })

    const totalMovementsColumns = getTotalMovementsColumns({
      depositsTotalAmount,
      withdrawalsTotalAmount,
      movementsTotalAmount,
    })

    return (
      <Fragment>
        <br />
        <h4>
          {t('taxreport.movements')}
        </h4>
        <DataTable
          numRows={movementsEntries.length}
          tableColums={movementsColumns}
        />
        <br />
        <DataTable
          numRows={1}
          tableColums={totalMovementsColumns}
        />
      </Fragment>
    )
  }

  render() {
    const {
      data,
      handleClickExport,
      loading,
      refresh,
      t,
    } = this.props
    const {
      winLossTotalAmount,
      startPositionsSnapshot,
      startTickers,
      endPositionsSnapshot,
      endTickers,
      movementsEntries,
      depositsTotalAmount,
      withdrawalsTotalAmount,
      movementsTotalAmount,
    } = data
    const { start, end } = this.state
    const hasNewTime = this.hasNewTime()

    const isEmpty = !_isNumber(winLossTotalAmount) && !startPositionsSnapshot.length && !endPositionsSnapshot.length
      && !movementsEntries.length && !_isNumber(depositsTotalAmount)
      && !_isNumber(withdrawalsTotalAmount) && !_isNumber(movementsTotalAmount)

    const renderTimeSelection = (
      <Fragment>
        <Tooltip
          content={(
            <span>
              {t('taxreport.query.startDateTooltip')}
            </span>
          )}
          position={Position.TOP}
        >
          <DateInput
            onChange={date => this.handleDateChange('start', date)}
            value={start}
          />
        </Tooltip>
        {' '}
        <Tooltip
          content={(
            <span>
              {t('taxreport.query.endDateTooltip')}
            </span>
          )}
          position={Position.TOP}
        >
          <DateInput
            onChange={date => this.handleDateChange('end', date)}
            value={end}
          />
        </Tooltip>
        <Button
          onClick={this.handleQuery}
          intent={hasNewTime ? Intent.PRIMARY : null}
          disabled={!hasNewTime}
        >
          {t('taxreport.query.title')}
        </Button>
      </Fragment>
    )

    const renderTitle = (
      <Fragment>
        <h4>
          {t('taxreport.title')}
          {' '}
          {renderTimeSelection}
          {!isEmpty && (
            <Fragment>
              {' '}
              <ExportButton handleClickExport={handleClickExport} />
            </Fragment>
          )}
          {' '}
          <RefreshButton handleClickRefresh={refresh} />
        </h4>
      </Fragment>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='taxreport.title' />
      )
    } else if (isEmpty) {
      showContent = (
        <Fragment>
          {renderTitle}
          <NoData />
        </Fragment>
      )
    } else {
      const totalWinLossColumns = getTotalWinLossColumns({ winLossTotalAmount })

      showContent = (
        <Fragment>
          {renderTitle}
          {_isNumber(winLossTotalAmount) && (
            <DataTable
              numRows={1}
              tableColums={totalWinLossColumns}
            />
          ) }
          {(startPositionsSnapshot.length || endPositionsSnapshot.length) ? <br /> : null}
          {this.getPositions(startPositionsSnapshot, startTickers, t('taxreport.startPositions'))}
          {this.getPositions(endPositionsSnapshot, endTickers, t('taxreport.endPositions'))}
          {this.getMovements()}
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {showContent}
      </Card>
    )
  }
}

TaxReport.propTypes = propTypes

export default withTranslation('translations')(TaxReport)
