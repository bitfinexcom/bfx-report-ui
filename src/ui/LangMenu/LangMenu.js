import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _keys from 'lodash/keys'

import Select from 'ui/Select'
import { LANGUAGE_NAMES } from 'locales/i18n'

const items = _keys(LANGUAGE_NAMES).map(lang => ({ value: lang, label: LANGUAGE_NAMES[lang] }))

const LangMenu = ({ setLang, value }) => (
  <Select
    items={items}
    value={value}
    onChange={setLang}
    className='bitfinex-select--language'
    popoverClassName='bitfinex-select-menu--language'
  />
)

LangMenu.propTypes = {
  value: PropTypes.string.isRequired,
  setLang: PropTypes.func.isRequired,
}

export default memo(LangMenu)
