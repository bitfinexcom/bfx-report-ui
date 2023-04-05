import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
// import { useTranslation } from 'react-i18next'

import { formatDate } from 'state/utils'
import { getTimezone } from 'state/base/selectors'


const REPORTS_LINK = 'https://reporting.bitfinex.com/'

const LimitNote = ({ start, end }) => {
  // const { t } = useTranslation()
  const timezone = useSelector(getTimezone)
  return (
    <div className='limit-note'>
      <p className='limit-note--header'>
        {`${formatDate(start, timezone)} - ${formatDate(end, timezone)} *`}
      </p>
      <a
        target='_blank'
        rel='noreferrer'
        href={REPORTS_LINK}
      >
        link
      </a>
    </div>
  )
}

LimitNote.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
}

export default LimitNote


// <Callout>
// {t('auth.note1')}
// <a href={config.KEY_URL} target='_blank' rel='noopener noreferrer'>
//   {config.KEY_URL.split('https://')[1]}
// </a>
// {t('auth.note2')}
// </Callout>
