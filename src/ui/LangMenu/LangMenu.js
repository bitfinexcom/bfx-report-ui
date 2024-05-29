import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _map from 'lodash/map'
import _keys from 'lodash/keys'

import Select from 'ui/Select'
import { setLang } from 'state/base/actions'
import { LANGUAGE_NAMES } from 'locales/i18n'
import { getLocale } from 'state/base/selectors'

const items = _map(_keys(LANGUAGE_NAMES), (lang) => ({ value: lang, label: LANGUAGE_NAMES[lang] }))

const LangMenu = () => {
  const dispatch = useDispatch()
  const currentValue = useSelector(getLocale)

  const handleChange = useCallback((value) => {
    dispatch(setLang(value))
  }, [dispatch])

  return (
    <Select
      items={items}
      type={'Language'}
      value={currentValue}
      onChange={handleChange}
      className='bitfinex-select--language'
      popoverClassName='bitfinex-select-menu--language'
    />
  )
}

export default LangMenu
