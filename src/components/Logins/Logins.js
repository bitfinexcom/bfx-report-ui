import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button, Card, Elevation, Intent, Position, Tooltip,
} from '@blueprintjs/core'
import _isEqual from 'lodash/isEqual'

import ColumnsFilter from 'ui/ColumnsFilter'
import Pagination from 'ui/Pagination'
import DataTable from 'ui/DataTable'
import DateInput from 'ui/DateInput'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import QueryLimitSelector from 'ui/QueryLimitSelector'
import queryConstants from 'state/query/constants'
import { isValidTimeStamp } from 'state/query/utils'
import { checkInit, checkFetch } from 'state/utils'

import getColumns from './Logins.columns'
import { propTypes, defaultProps } from './Logins.props'

const TYPE = queryConstants.MENU_LOGINS

class Logins extends PureComponent {
  constructor(props) {
    super(props)

    const { params: { start, end } } = props
    this.state = {
      start: start && new Date(start),
      end: end && new Date(end),
    }
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleDateChange = (input, time) => {
    const { setParams } = this.props
    const timestamp = time && time.getTime()
    this.setState({ [input]: timestamp ? new Date(timestamp) : undefined })
    if (isValidTimeStamp(timestamp) || time === null) {
      setParams({ [input]: time ? timestamp : undefined })
    }
  }

  handleQuery = () => {
    const { refresh, fetchData } = this.props
    refresh()
    fetchData()
  }

  hasChanges = () => {
    const { currentFetchParams, params } = this.props
    return !_isEqual(currentFetchParams, params)
  }

  render() {
    const {
      columns,
      getFullTime,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      t,
      timeOffset,
    } = this.props
    const { start, end } = this.state
    const hasChanges = this.hasChanges()

    const tableColumns = getColumns({
      filteredData: entries,
      getFullTime,
      t,
      timeOffset,
    }).filter(({ id }) => columns[id])

    const renderTimeSelection = (
      <Fragment>
        <Tooltip
          content={(
            <span>
              {t('query.startDateTooltip')}
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
              {t('query.endDateTooltip')}
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
          intent={hasChanges ? Intent.PRIMARY : null}
          disabled={!hasChanges}
        >
          {t('query.title')}
        </Button>
      </Fragment>
    )

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = (
        <Loading title='logins.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('logins.title')}
            {' '}
            {renderTimeSelection}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
            {' '}
            <QueryLimitSelector target={TYPE} />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('logins.title')}
            {' '}
            {renderTimeSelection}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <ExportButton />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <Pagination loading={pageLoading} target={TYPE} />
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination loading={pageLoading} target={TYPE} />
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

Logins.propTypes = propTypes
Logins.defaultProps = defaultProps

export default withTranslation('translations')(Logins)
