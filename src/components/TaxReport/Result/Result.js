import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import NoData from 'ui/NoData'
import { fixedFloat } from 'ui/utils'
import queryConstants from 'state/query/constants'
import { checkFetch, checkInit } from 'state/utils'
import getMovementsColumns from 'components/Movements/Movements.columns'
import { getFrameworkPositionsColumns } from 'utils/columns'

import { propTypes } from './Result.props'
import getBalancesColumns from './Balances.columns'

const TYPE = queryConstants.MENU_TAX_REPORT

class TaxReport extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
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
        <div className='table-section-title'>
          {title}
        </div>
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
        <div className='table-section-title'>
          {title}
        </div>
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
    } = data.finalState

    const movementsColumns = getMovementsColumns({
      filteredData: movements,
      getFullTime,
      t,
      timeOffset,
    })

    return (
      <Fragment>
        <div className='table-section-title'>
          {t('taxreport.movements')}
        </div>
        <DataTable
          className='movements-table'
          numRows={movements.length}
          tableColumns={movementsColumns}
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
      dataReceived,
      pageLoading,
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

    if (!dataReceived && pageLoading) {
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

    const positionsNotEmpty = startingPositionsSnapshot.length || endingPositionsSnapshot.length

    return (
      <Fragment>
        {_isNumber(totalResult) && _isNumber(movementsTotalAmount) && (
          <div className='total-stats'>
            {_isNumber(totalResult) && (
              <div className='total-stats-item'>
                <div className='color--active'>
                  {t('column.totalResult')}
                </div>
                <span>{fixedFloat(totalResult)}</span>
              </div>
            )}
            {_isNumber(movementsTotalAmount) && (
              <div className='total-stats-item'>
                <div className='color--active'>
                  {t('column.movementsTotal')}
                </div>
                <span>{fixedFloat(movementsTotalAmount)}</span>
              </div>
            )}
          </div>
        )}
        {movements.length > 0 && this.getMovements()}
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
        <br />
        {this.getBalances({
          balances: endingPeriodBalances,
          title: t('taxreport.endingPeriodBalances'),
        })}
      </Fragment>
    )
  }
}

TaxReport.propTypes = propTypes

export default withTranslation('translations')(TaxReport)
