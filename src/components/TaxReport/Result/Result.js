import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _isNumber from 'lodash/isNumber'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
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
  static propTypes = {
    data: PropTypes.shape({
      startingPositionsSnapshot: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number,
        basePrice: PropTypes.number,
        liquidationPrice: PropTypes.number,
        marginFunding: PropTypes.number,
        marginFundingType: PropTypes.number,
        mtsUpdate: PropTypes.number,
        pair: PropTypes.string.isRequired,
        pl: PropTypes.number,
        plPerc: PropTypes.number,
      })).isRequired,
      endingPositionsSnapshot: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number,
        basePrice: PropTypes.number,
        liquidationPrice: PropTypes.number,
        marginFunding: PropTypes.number,
        marginFundingType: PropTypes.number,
        mtsUpdate: PropTypes.number,
        pair: PropTypes.string.isRequired,
        pl: PropTypes.number,
        plPerc: PropTypes.number,
      })).isRequired,
      finalState: PropTypes.shape({
        startingPeriodBalances: PropTypes.shape({
          walletsTotalBalanceUsd: PropTypes.number,
          positionsTotalPlUsd: PropTypes.number,
          totalResult: PropTypes.number,
        }),
        movements: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number.isRequired,
          currency: PropTypes.string.isRequired,
          mtsStarted: PropTypes.number.isRequired,
          mtsUpdated: PropTypes.number.isRequired,
          status: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired,
          destinationAddress: PropTypes.string,
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

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  getPositionsSnapshot = ({ positions, title }) => {
    const {
      t,
      timeOffset,
      getFullTime,
    } = this.props

    if (!positions.length) {
      return null
    }

    const positionsColumns = getFrameworkPositionsColumns({
      t,
      timeOffset,
      getFullTime,
      filteredData: positions,
    })

    return (
      <>
        <div className='table-section-title'>
          {title}
        </div>
        <DataTable
          numRows={positions.length}
          tableColumns={positionsColumns}
        />
      </>
    )
  }

  getBalances = ({ balances, title }) => {
    if (this.isBalancesEmpty(balances)) {
      return null
    }

    const {
      totalResult,
      positionsTotalPlUsd,
      walletsTotalBalanceUsd,
    } = balances

    const balancesColumns = getBalancesColumns({
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
          tableColumns={balancesColumns}
        />
      </>
    )
  }

  getMovements = () => {
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
          className='movements-table'
          numRows={movements.length}
          tableColumns={movementsColumns}
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
      return <NoData refresh={this.refresh} />
    }

    const positionsNotEmpty = startingPositionsSnapshot.length || endingPositionsSnapshot.length

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
      </>
    )
  }
}

export default Result
