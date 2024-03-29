import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _isNumber from 'lodash/isNumber'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'
import queryConstants from 'state/query/constants'
import { checkFetch, checkInit } from 'state/utils'
import { getFrameworkPositionsColumns } from 'utils/columns'
import getMovementsColumns from 'components/Movements/Movements.columns'

import getBalancesColumns from './Balances.columns'
import TAX_REPORT_SECTIONS from '../TaxReport.sections'

const TYPE = queryConstants.MENU_TAX_REPORT

class Result extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  getPositionsSnapshot = ({ positions, title, isLoading }) => {
    const {
      t,
      timeOffset,
      getFullTime,
    } = this.props

    const positionsColumns = getFrameworkPositionsColumns({
      t,
      isLoading,
      timeOffset,
      getFullTime,
      filteredData: positions,
      isNoData: isEmpty(positions),
    })

    return (
      <>
        <div className='table-section-title'>
          {title}
        </div>
        <DataTable
          isLoading={isLoading}
          numRows={positions.length}
          isNoData={isEmpty(positions)}
          tableColumns={positionsColumns}
        />
      </>
    )
  }

  getBalances = ({ balances, title, isLoading }) => {
    const { t } = this.props
    const isNoData = this.isBalancesEmpty(balances)
    const {
      totalResult,
      positionsTotalPlUsd,
      walletsTotalBalanceUsd,
    } = balances

    const balancesColumns = getBalancesColumns({
      t,
      isNoData,
      isLoading,
      totalResult,
      positionsTotalPlUsd,
      walletsTotalBalanceUsd,
    })

    return (
      <>
        <div className='table-section-title'>
          {title}
        </div>
        <DataTable
          numRows={1}
          isNoData={isNoData}
          isLoading={isLoading}
          tableColumns={balancesColumns}
        />
      </>
    )
  }

  getMovements = (isNoData, isLoading) => {
    const {
      t,
      data,
      timeOffset,
      getFullTime,
    } = this.props
    const {
      movements,
    } = data.finalState

    const movementsColumns = getMovementsColumns({
      t,
      isNoData,
      isLoading,
      timeOffset,
      getFullTime,
      filteredData: movements,
    })

    return (
      <>
        <div className='table-section-title'>
          {t('taxreport.movements')}
        </div>
        <DataTable
          isNoData={isNoData}
          isLoading={isLoading}
          className='movements-table'
          tableColumns={movementsColumns}
          numRows={isLoading ? 5 : movements.length}
        />
      </>
    )
  }

  isBalancesEmpty = (balances) => {
    const {
      totalResult,
      positionsTotalPlUsd,
      walletsTotalBalanceUsd,
    } = balances

    return !_isNumber(walletsTotalBalanceUsd)
      && !_isNumber(positionsTotalPlUsd)
      && !totalResult
  }

  refresh = () => {
    const { refresh } = this.props
    refresh(TAX_REPORT_SECTIONS.RESULT)
  }

  render() {
    const {
      t,
      data,
      pageLoading,
      dataReceived,
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
    const isLoading = !dataReceived && pageLoading
    const isNoData = !startingPositionsSnapshot.length
      && !endingPositionsSnapshot.length
      && this.isBalancesEmpty(startingPeriodBalances)
      && this.isBalancesEmpty(endingPeriodBalances)
      && !movements.length
      && !_isNumber(movementsTotalAmount)
      && !totalResult // can be 0 even if data is absent

    return (
      <>
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
        {this.getMovements(isNoData, isLoading)}
        {this.getPositionsSnapshot({
          isLoading,
          positions: startingPositionsSnapshot,
          title: t('taxreport.startPositions'),
        })}
        <br />
        {this.getPositionsSnapshot({
          isLoading,
          positions: endingPositionsSnapshot,
          title: t('taxreport.endPositions'),
        })}
        <br />
        {this.getBalances({
          isLoading,
          balances: startingPeriodBalances,
          title: t('taxreport.startingPeriodBalances'),
        })}
        <br />
        {this.getBalances({
          isLoading,
          balances: endingPeriodBalances,
          title: t('taxreport.endingPeriodBalances'),
        })}
      </>
    )
  }
}

Result.propTypes = {
  data: PropTypes.shape({
    startingPositionsSnapshot: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        basePrice: PropTypes.number,
        liquidationPrice: PropTypes.number,
        marginFunding: PropTypes.number,
        marginFundingType: PropTypes.number,
        mtsUpdate: PropTypes.number,
        pair: PropTypes.string.isRequired,
        pl: PropTypes.number,
        plPerc: PropTypes.number,
      }),
    ).isRequired,
    endingPositionsSnapshot: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        basePrice: PropTypes.number,
        liquidationPrice: PropTypes.number,
        marginFunding: PropTypes.number,
        marginFundingType: PropTypes.number,
        mtsUpdate: PropTypes.number,
        pair: PropTypes.string.isRequired,
        pl: PropTypes.number,
        plPerc: PropTypes.number,
      }),
    ).isRequired,
    finalState: PropTypes.shape({
      startingPeriodBalances: PropTypes.shape({
        walletsTotalBalanceUsd: PropTypes.number,
        positionsTotalPlUsd: PropTypes.number,
        totalResult: PropTypes.number,
      }),
      movements: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number,
        amountUsd: PropTypes.number,
        currency: PropTypes.string,
        currencyName: PropTypes.string,
        destinationAddress: PropTypes.string,
        fees: PropTypes.number,
        id: PropTypes.number,
        mtsStarted: PropTypes.number,
        mtsUpdated: PropTypes.number,
        note: PropTypes.string,
        status: PropTypes.string,
        subUserId: PropTypes.number,
        transactionId: PropTypes.string,
      })).isRequired,
      movementsTotalAmount: PropTypes.number,
      endingPeriodBalances: PropTypes.shape({
        walletsTotalBalanceUsd: PropTypes.number,
        positionsTotalPlUsd: PropTypes.number,
        totalResult: PropTypes.number,
      }),
      totalResult: PropTypes.number,
    }).isRequired,
  }).isRequired,
  pageLoading: PropTypes.bool.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  getFullTime: PropTypes.func.isRequired,
  timeOffset: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default Result
