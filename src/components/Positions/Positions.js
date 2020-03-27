import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
} from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import { getPath } from 'state/query/utils'
import { checkInit, checkFetch, togglePair } from 'state/utils'

import getColumns from './Positions.columns'
import { propTypes, defaultProps } from './Positions.props'

const TYPE = queryConstants.MENU_POSITIONS

class Positions extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  jumpToPositionsAudit = (e) => {
    e.preventDefault()
    const { history } = this.props
    const id = e.target.getAttribute('value')
    history.push(`${getPath(queryConstants.MENU_POSITIONS_AUDIT)}/${id}${window.location.search}`)
  }

  jumpToActivePositions = (e) => {
    e.preventDefault()
    const { history } = this.props
    history.push(`${getPath(queryConstants.MENU_POSITIONS_ACTIVE)}${window.location.search}`)
  }

  togglePair = pair => togglePair(TYPE, this.props, pair)

  render() {
    const {
      columns,
      existingPairs,
      getFullTime,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      t,
      targetPairs,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      target: TYPE,
      filteredData: entries,
      getFullTime,
      t,
      onIdClick: this.jumpToPositionsAudit,
      timeOffset,
    }).filter(({ id }) => columns[id])

    const renderButtonGroup = (
      <ButtonGroup>
        <Button active>{t('positions.closed')}</Button>
        <Button onClick={this.jumpToActivePositions}>{t('positions.active')}</Button>
      </ButtonGroup>
    )

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          {renderButtonGroup}
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          {renderButtonGroup}
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination target={TYPE} loading={pageLoading} />
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader
          title='positions.title'
          target={TYPE}
          pairsSelectorProps={{
            currentFilters: targetPairs,
            existingPairs,
            togglePair: this.togglePair,
          }}
          refresh={refresh}
        />
        {showContent}
      </Card>
    )
  }
}

Positions.propTypes = propTypes
Positions.defaultProps = defaultProps

export default withTranslation('translations')(Positions)
