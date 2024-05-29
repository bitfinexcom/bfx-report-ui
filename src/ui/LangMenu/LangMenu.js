import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _keys from 'lodash/keys'

import Select from 'ui/Select'
import { LANGUAGE_NAMES } from 'locales/i18n'

const items = _map(_keys(LANGUAGE_NAMES), (lang) => ({ value: lang, label: LANGUAGE_NAMES[lang] }))

const LangMenu = (props) => {
  const { setLang, value } = props

  return (
    <Select
      className='bitfinex-select--language'
      popoverClassName='bitfinex-select-menu--language'
      value={value}
      items={items}
      onChange={setLang}
      type={'Language'}
    />
  )
}

LangMenu.propTypes = {
  value: PropTypes.string.isRequired,
  setLang: PropTypes.func.isRequired,
}

export default LangMenu
