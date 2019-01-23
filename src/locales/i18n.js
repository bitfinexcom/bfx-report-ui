/* eslint-disable import/extensions, import/no-unresolved, import/no-extraneous-dependencies */
// install these dependencies manually in projects that require i18n.js
// refer https://github.com/bitfinexcom/bfxuilib/blob/master/functions/i18n.spa.js

import i18n from 'i18next'
import backend from 'i18next-xhr-backend'
import detector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

export const LANGUAGES = {
  en: 'en-US',
  // RU: 'ru',
  // ZH_CN: 'zh-CN',
  tw: 'zh-TW',
}

const { NODE_ENV } = process.env

i18n
  .use(detector)
  .use(backend)
  .use(reactI18nextModule)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['querystring', 'localStorage'],
      lookupQuerystring: 'locale',
    },

    parseMissingKeyHandler: (key) => {
      // eslint-disable-next-line no-console
      console.warn(`Missing translation for ${key}`)
      return key
    },
    // use en if detected lng is not available
    fallbackLng: LANGUAGES.en,

    ns: ['translations'],
    defaultNS: 'translations',

    debug: (NODE_ENV === 'development'),

    react: {
      wait: true,
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // send not translated keys to endpoint
    saveMissing: (NODE_ENV === 'development'),

    // react: {
    //   wait: false,
    //   bindI18n: 'languageChanged loaded',
    //   bindStore: 'added removed',
    //   nsMode: 'default'
    // }
  })

export default i18n
