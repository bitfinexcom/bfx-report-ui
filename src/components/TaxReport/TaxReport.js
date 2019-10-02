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
import { getFrameworkPositionsColumns } from 'utils/columns'

import { propTypes } from './TaxReport.props'
import getBalancesColumns from './Balances.columns'
import getTotalMovementsColumns from './TotalMovements.columns'
import getTotalResultColumns from './TotalResult.columns'

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

  getPositionsSnapshot = ({ positions, title }) => {
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

    return (
      <Fragment>
        <h4>
          {title}
        </h4>
        <DataTable
          numRows={positions.length}
          tableColums={positionsColumns}
        />
      </Fragment>
    )
  }

  getBalances = ({ balances, title }) => {
    if (this.isBalancesEmpty(balances)) {
      return null
    }

    const {
      walletsTotalBalanceUsd,
      positionsTotalPlUsd,
      totalResult,
    } = balances

    const balancesColumns = getBalancesColumns({
      walletsTotalBalanceUsd,
      positionsTotalPlUsd,
      totalResult,
    })

    return (
      <Fragment>
        <h4>
          {title}
        </h4>
        <DataTable
          numRows={1}
          tableColums={balancesColumns}
        />
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
      movements,
      movementsTotalAmount,
    } = data.finalState

    const movementsColumns = getMovementsColumns({
      filteredData: movements,
      getFullTime,
      t,
      timeOffset,
    })

    const totalMovementsColumns = getTotalMovementsColumns({
      movementsTotalAmount,
    })

    return (
      <Fragment>
        <h4>
          {t('taxreport.movements')}
        </h4>
        {(movements.length > 0) && (
          <Fragment>
            <DataTable
              numRows={movements.length}
              tableColums={movementsColumns}
            />
            <br />
          </Fragment>
        )}
        <DataTable
          numRows={1}
          tableColums={totalMovementsColumns}
        />
      </Fragment>
    )
  }

  isBalancesEmpty = (balances) => {
    const {
      walletsTotalBalanceUsd,
      positionsTotalPlUsd,
      totalResult,
    } = balances

    return !_isNumber(walletsTotalBalanceUsd)
      && !_isNumber(positionsTotalPlUsd)
      && !totalResult
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
      startingPositionsSnapshot,
      endingPositionsSnapshot,
      finalState: {
        startingPeriodBalances,
        endingPeriodBalances,
        movements,
        movementsTotalAmount,
        totalResult,
      },
    } = data
    const { start, end } = this.state
    const hasNewTime = this.hasNewTime()

    const isEmpty = !startingPositionsSnapshot.length
      && !endingPositionsSnapshot.length
      && this.isBalancesEmpty(startingPeriodBalances)
      && this.isBalancesEmpty(endingPeriodBalances)
      && !movements.length
      && !_isNumber(movementsTotalAmount)
      && !totalResult // can be 0 even if data is absent

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
      const totalResultColumns = getTotalResultColumns({ totalResult })

      const positionsNotEmpty = startingPositionsSnapshot.length || endingPositionsSnapshot.length
      const movementsNotEmpty = movements.length || _isNumber(movementsTotalAmount)

      showContent = (
        <Fragment>
          {renderTitle}
          {this.getPositionsSnapshot({
            positions: startingPositionsSnapshot,
            title: t('taxreport.startPositions'),
          })}
          {this.getPositionsSnapshot({
            positions: [],
            title: t('taxreport.endPositions'),
          })}
          {positionsNotEmpty ? <br /> : null}
          {this.getBalances({
            balances: startingPeriodBalances,
            title: t('taxreport.startingPeriodBalances'),
          })}
          {this.getBalances({
            balances: endingPeriodBalances,
            title: t('taxreport.endingPeriodBalances'),
          })}
          {movementsNotEmpty && (
            <Fragment>
              <br />
              {this.getMovements()}
            </Fragment>
          )}
          {_isNumber(totalResult) && (
            <Fragment>
              <br />
              <br />
              <DataTable
                numRows={1}
                tableColums={totalResultColumns}
              />
            </Fragment>
          ) }
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
