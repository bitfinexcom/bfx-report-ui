import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Card,
  Elevation,
  Intent,
} from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import DateInput from 'ui/DateInput'
import NavSwitcher from 'ui/NavSwitcher'
import RefreshButton from 'ui/RefreshButton'
import { isValidTimeStamp } from 'state/query/utils'

import Result from './Result'
import Snapshot from './Snapshot'
import { propTypes } from './TaxReport.props'
import TAX_REPORT_SECTIONS from './TaxReport.sections'

const {
  START_SNAPSHOT,
  END_SNAPSHOT,
  RESULT,
} = TAX_REPORT_SECTIONS

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
    const { section = RESULT } = match.params

    setParams({ params, section })
  }

  handleRefresh = () => {
    const { match, refresh } = this.props
    const { section = RESULT } = match.params
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

    const path = this.getSectionURL(section)
    history.push(`${path}${window.location.search}`)
  }

  getSection = (section) => {
    switch (section) {
      case START_SNAPSHOT:
        return <Snapshot key={START_SNAPSHOT} />
      case END_SNAPSHOT:
        return <Snapshot key={END_SNAPSHOT} />
      case RESULT:
      default:
        return <Result />
    }
  }

  getSectionURL = (section) => {
    switch (section) {
      case START_SNAPSHOT:
        return `${SECTIONS_URL.START_SNAPSHOT}/positions`
      case END_SNAPSHOT:
        return `${SECTIONS_URL.END_SNAPSHOT}/positions`
      case RESULT:
        return SECTIONS_URL.RESULT
      default:
        return ''
    }
  }

  render() {
    const { match, t } = this.props
    const { start, end } = this.state
    const hasNewTime = this.hasNewTime()
    const { section = RESULT } = match.params

    return (
      <Card elevation={Elevation.ZERO} className='tax-report col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('taxreport.title')}</SectionHeaderTitle>
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.startTime')}
              </SectionHeaderItemLabel>
              <DateInput
                onChange={date => this.handleDateChange('start', date)}
                defaultValue={start}
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.endTime')}
              </SectionHeaderItemLabel>
              <DateInput
                onChange={date => this.handleDateChange('end', date)}
                defaultValue={end}
              />
            </SectionHeaderItem>

            <Button
              className='button--large'
              onClick={this.handleQuery}
              intent={Intent.PRIMARY}
              disabled={!hasNewTime}
            >
              {t('query.title')}
            </Button>
            <RefreshButton onClick={this.handleRefresh} />
          </SectionHeaderRow>
        </SectionHeader>

        <NavSwitcher
          items={[
            { value: START_SNAPSHOT, label: t('taxreport.sections.startSnapshot') },
            { value: END_SNAPSHOT, label: t('taxreport.sections.endSnapshot') },
            { value: RESULT, label: t('taxreport.sections.finalResult') },
          ]}
          onChange={this.switchSection}
          value={section}
        />

        {this.getSection(section)}
      </Card>
    )
  }
}

TaxReport.propTypes = propTypes

export default withTranslation('translations')(TaxReport)
