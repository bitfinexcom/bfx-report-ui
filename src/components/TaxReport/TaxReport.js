import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
  Intent,
  Position,
  Tooltip,
} from '@blueprintjs/core'

import DateInput from 'ui/DateInput'
import ExportButton from 'ui/ExportButton'
import RefreshButton from 'ui/RefreshButton'
import { isValidTimeStamp } from 'state/query/utils'

import Result from './Result'
import Snapshot from './Snapshot'
import { propTypes } from './TaxReport.props'

const SECTIONS = {
  START_SNAPSHOT: 'start_snapshot',
  END_SNAPSHOT: 'end_snapshot',
  RESULT: 'result',
}

const SECTIONS_URL = {
  START_SNAPSHOT: '/tax_report/start_snapshot',
  END_SNAPSHOT: '/tax_report/end_snapshot',
  RESULT: '/tax_report/result',
}

class TaxReport extends PureComponent {
  constructor(props) {
    super(props)

    const { params: { start, end } } = props
    this.state = {
      start: start && new Date(start),
      end: end && new Date(end),
    }
  }

  handleDateChange = (input, time) => {
    const timestamp = time && time.getTime()
    if (isValidTimeStamp(timestamp) || time === null) {
      this.setState({ [input]: time || null })
    }
  }

  handleQuery = () => {
    const { start, end } = this.state
    const { match, setParams } = this.props
    const params = {
      start: start ? start.getTime() : undefined,
      end: end ? end.getTime() : undefined,
    }
    const { section = SECTIONS.RESULT } = match.params

    setParams({ params, section })

    // const { match, fetchTaxReport, fetchSnapshot } = this.props
    // const { start, end } = this.state
    // const { section = SECTIONS.RESULT } = match.params
    // const params = {
    //   start: start ? start.getTime() : undefined,
    //   end: end ? end.getTime() : undefined,
    // }
    // if (section === SECTIONS.RESULT) {
    //   fetchTaxReport(params)
    // } else {
    //   fetchSnapshot({ params, section })
    // }
  }

  handleRefresh = () => {
    const { match, refresh } = this.props
    const { section = SECTIONS.RESULT } = match.params
    refresh({ section })
  }

  hasNewTime = () => {
    const { params } = this.props
    const { start: currStart, end: currEnd } = params
    const { start, end } = this.state
    const isDiffStart = start ? start.getTime() !== currStart : !!start !== !!currStart
    const isDiffEnd = end ? end.getTime() !== currEnd : !!end !== !!currEnd
    return isDiffStart || isDiffEnd
  }

  switchSection = (section) => {
    const { history } = this.props
    history.push(`${section}${history.location.search}`)
  }

  getSection = (section) => {
    switch (section) {
      case SECTIONS.START_SNAPSHOT:
        return <Snapshot key={SECTIONS.START_SNAPSHOT} />
      case SECTIONS.END_SNAPSHOT:
        return <Snapshot key={SECTIONS.END_SNAPSHOT} />
      case SECTIONS.RESULT:
      default:
        return <Result />
    }
  }

  render() {
    const {
      handleClickExport,
      match,
      t,
    } = this.props
    const { start, end } = this.state
    const hasNewTime = this.hasNewTime()
    const { section = SECTIONS.RESULT } = match.params

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

    const renderButtonGroup = (
      <ButtonGroup>
        <Button
          active={section === SECTIONS.START_SNAPSHOT}
          onClick={() => this.switchSection(`${SECTIONS_URL.START_SNAPSHOT}/positions`)}
        >
          {t('taxreport.sections.startSnapshot')}
        </Button>
        <Button
          active={section === SECTIONS.END_SNAPSHOT}
          onClick={() => this.switchSection(`${SECTIONS_URL.END_SNAPSHOT}/positions`)}
        >
          {t('taxreport.sections.endSnapshot')}
        </Button>
        <Button
          active={section === SECTIONS.RESULT}
          onClick={() => this.switchSection(SECTIONS_URL.RESULT)}
        >
          {t('taxreport.sections.finalResult')}
        </Button>
      </ButtonGroup>
    )

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <h4>
          {t('taxreport.title')}
          {' '}
          {renderTimeSelection}
          {' '}
          <ExportButton handleClickExport={handleClickExport} />
          {' '}
          <RefreshButton handleClickRefresh={this.handleRefresh} />
        </h4>
        {renderButtonGroup}
        <br />
        <br />
        {this.getSection(section)}
      </Card>
    )
  }
}

TaxReport.propTypes = propTypes

export default withTranslation('translations')(TaxReport)
