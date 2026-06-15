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
import _isArray from 'lodash/isArray'
import { isEqual } from '@bitfinex/lib-js-util-base'

import config from 'config'
import { getCaptchaProviders, isCaptchaRequired } from 'state/utils'

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
    const { result } = await isCaptchaRequired(method)
    // fail-safe: only an explicit `false` means the captcha can be skipped
    return !isEqual(result, false)
  } catch (e) {
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
      .then(({ result }) => {
        if (isSubscribed && _isArray(result)) setProvider(_first(result))
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
