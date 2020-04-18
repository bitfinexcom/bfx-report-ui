import React from 'react'
import _keys from 'lodash/keys'

import Select from 'ui/Select'
import { LANGUAGE_NAMES } from 'locales/i18n'

import { propTypes, defaultProps } from './LangMenu.props'

const items = _keys(LANGUAGE_NAMES).map(lang => ({ value: lang, label: LANGUAGE_NAMES[lang] }))

const LangMenu = (props) => {
  const { setLang, value } = props

  return (
    <Select
      className='bitfinex-select--language'
      popoverClassName='bitfinex-select-menu--language'
      value={value}
      items={items}
      onChange={setLang}
    />
  )
}

LangMenu.propTypes = propTypes
LangMenu.defaultProps = defaultProps

export default LangMenu
