import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import ReCAPTCHA from 'react-google-recaptcha'
import _get from 'lodash/get'
import _first from 'lodash/first'

import config from 'config'
import { getCaptchaProviders, getCaptchaRequired } from 'utils/api'

const { recaptchaSiteKey, hcaptchaSiteKey } = config

const getCaptchaConfig = (provider) => {
  if (provider === 'recaptcha') {
    return {
      Component: ReCAPTCHA,
      sitekey: recaptchaSiteKey,
      getToken: (captchaRef) => captchaRef.current.executeAsync(),
      reset: (captchaRef) => captchaRef.current.reset(),
    }
  }
  return {
    Component: HCaptcha,
    sitekey: hcaptchaSiteKey,
    getToken: async (captchaRef) => {
      const res = await captchaRef.current.execute({ async: true })
      return _get(res, 'response')
    },
    reset: (captchaRef) => captchaRef.current.resetCaptcha(),
  }
}

const checkCaptchaRequired = async (method) => {
  try {
    const { data } = await getCaptchaRequired(method)
    return data
  } catch (e) {
    // fail-safe: if the check fails, assume captcha is required
    return true
  }
}

// Invisible captcha widget that auto-selects the provider returned by the
// BFX `captcha/providers` endpoint (reCAPTCHA or hCaptcha). Exposes an
// imperative `getToken(method)` for the auth forms to call before login.
const Captcha = forwardRef((props, ref) => {
  const captchaRef = useRef(null)
  const [provider, setProvider] = useState()

  useEffect(() => {
    let isSubscribed = true
    getCaptchaProviders()
      .then(({ data }) => {
        if (isSubscribed) setProvider(_first(data))
      })
      .catch(() => {})
    return () => {
      isSubscribed = false
    }
  }, [])

  const {
    Component,
    sitekey,
    getToken,
    reset,
  } = getCaptchaConfig(provider)

  useImperativeHandle(ref, () => ({
    getToken: async (method) => {
      const isRequired = await checkCaptchaRequired(method)
      if (!isRequired) {
        return { captchaToken: null, captchaProvider: provider }
      }
      try {
        const captchaToken = await getToken(captchaRef)
        return { captchaToken, captchaProvider: provider }
      } finally {
        // always reset so a failed/cancelled challenge doesn't block a retry
        reset(captchaRef)
      }
    },
  }))

  return (
    <Component
      theme='dark'
      ref={captchaRef}
      sitekey={sitekey}
      size='invisible'
    />
  )
})

Captcha.displayName = 'Captcha'

export default Captcha
