import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import NoData from 'ui/NoData'
import getMovementsColumns from 'components/Movements/Movements.columns'
import { getFrameworkPositionsColumns } from 'utils/columns'

import { propTypes } from './Result.props'
import getBalancesColumns from './Balances.columns'
import getTotalMovementsColumns from './TotalMovements.columns'
import getTotalResultColumns from './TotalResult.columns'

class TaxReport extends PureComponent {
  componentDidMount() {
    const { loading, fetchTaxReport } = this.props
    if (loading) {
      fetchTaxReport()
    }
  }

  switchSection = (section) => {
    const { history } = this.props
    history.push(`${section}${history.location.search}`)
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
          tableColumns={positionsColumns}
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
          tableColumns={balancesColumns}
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
              tableColumns={movementsColumns}
            />
            <br />
          </Fragment>
        )}
        <DataTable
          numRows={1}
          tableColumns={totalMovementsColumns}
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
      loading,
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

    if (loading) {
      return <Loading />
    }

    const isEmpty = !startingPositionsSnapshot.length
      && !endingPositionsSnapshot.length
      && this.isBalancesEmpty(startingPeriodBalances)
      && this.isBalancesEmpty(endingPeriodBalances)
      && !movements.length
      && !_isNumber(movementsTotalAmount)
      && !totalResult // can be 0 even if data is absent

    if (isEmpty) {
      return <NoData />
    }

    const totalResultColumns = getTotalResultColumns({ totalResult })

    const positionsNotEmpty = startingPositionsSnapshot.length || endingPositionsSnapshot.length
    const movementsNotEmpty = movements.length || _isNumber(movementsTotalAmount)

    return (
      <Fragment>
        {this.getPositionsSnapshot({
          positions: startingPositionsSnapshot,
          title: t('taxreport.startPositions'),
        })}
        {this.getPositionsSnapshot({
          positions: endingPositionsSnapshot,
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
              tableColumns={totalResultColumns}
            />
          </Fragment>
        ) }
      </Fragment>
    )
  }
}

TaxReport.propTypes = propTypes

export default withTranslation('translations')(TaxReport)
