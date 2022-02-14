import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderTitle,
} from 'ui/SectionHeader'
import TimeRange from 'ui/TimeRange'
import NavSwitcher from 'ui/NavSwitcher'

import Result from './Result'
import Snapshot from './Snapshot'
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
  static propTypes = {
    t: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({ section: PropTypes.string }),
    }).isRequired,
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
    const { section = RESULT } = match.params

    return (
      <Card
        elevation={Elevation.ZERO}
        className='tax-report col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader>
          <SectionHeaderTitle>
            {t('taxreport.title')}
          </SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
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

export default TaxReport
