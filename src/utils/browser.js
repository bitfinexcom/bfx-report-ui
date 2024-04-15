import * as cookie from 'js-cookie'

import { cookieDomain } from '../var/platform'

export const defaultCookieOpts = cookieDomain === 'localhost'
  ? {}
  : { secure: true, domain: cookieDomain }

export const loadScript = (url) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  document.body.appendChild(script)
  script.onload = resolve
  script.onerror = reject
  script.async = true
  script.src = url
})

export const getCookieValue = (key) => cookie.get(key)

export const setCookie = (key, value, opts) => {
  cookie.set(key, value, { ...defaultCookieOpts, ...opts })
}

export const getSourceFromPathName = () => window?.location?.pathname?.slice(1) ?? ''
