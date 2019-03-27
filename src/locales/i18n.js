/* eslint-disable import/extensions, import/no-unresolved, import/no-extraneous-dependencies */
// install these dependencies manually in projects that require i18n.js
// refer https://github.com/bitfinexcom/bfxuilib/blob/master/functions/i18n.spa.js

import i18n from 'i18next'
import backend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend' // primary use cache
import XHR from 'i18next-xhr-backend' // fallback xhr load
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { version } from '../../package.json'

export const LANGUAGES = {
  en: 'en-US',
  // RU: 'ru',
  // ZH_CN: 'zh-CN',
  tw: 'zh-TW',
}

const { NODE_ENV } = process.env

i18n
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [
        LocalStorageBackend, // primary
        XHR, // fallback
      ],
      backendOptions: [{
        prefix: 'i18next_res_', // prefix for stored languages
        expirationTime: 7 * 24 * 60 * 60 * 1000, // expiration
        versions: {
          'en-US': version,
          'zh-TW': version,
        }, // language versions
        store: window.localStorage,
      }, {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      }],
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
      useSuspense: false,
      //   bindI18n: 'languageChanged loaded',
      //   bindStore: 'added removed',
      //   nsMode: 'default'
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // send not translated keys to endpoint
    saveMissing: (NODE_ENV === 'development'),
  })

export default i18n
