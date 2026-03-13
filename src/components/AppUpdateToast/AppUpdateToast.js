import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Intent } from '@blueprintjs/core'
import _isFinite from 'lodash/isFinite'

import Icon from 'icons'
import { closeAutoUpdateToast } from 'state/electronAutoUpdateToast/actions'
import { selectAutoUpdateToast } from 'state/electronAutoUpdateToast/selectors'
import Spinner from './AppUpdateToast.spinner'

import './_AppUpdateToast.scss'

const ICON_MAP = {
  error: <Icon.EXCLAMATION_CIRCLE className='au-toast__icon au-toast__icon--error' />,
  success: <Icon.CHECKMARK_CIRCLE className='au-toast__icon au-toast__icon--success' />,
  info: <Icon.INFO_CIRCLE className='au-toast__icon au-toast__icon--info' />,
  question: <Icon.INFO_CIRCLE className='au-toast__icon au-toast__icon--question' />,
}

export default function AppUpdateToast() {
  const dispatch = useDispatch()
  const toast = useSelector(selectAutoUpdateToast)

  if (!toast.visible) return null

  const showSpinner = _isFinite(toast.progress)
  const iconElement = !showSpinner ? ICON_MAP[toast.icon] : null

  return (
    <div className='au-toast'>
      {iconElement}

      {toast.title && (
        <div className='au-toast__title'>
          {toast.title}
        </div>
      )}

      {toast.text && (
        <div className='au-toast__text'>
          {toast.text}
        </div>
      )}

      {showSpinner && (
        <Spinner progress={toast.progress} />
      )}

      <div className='au-toast__actions'>
        {toast.showCancelButton && (
          <Button
            minimal
            small
            onClick={() => dispatch(closeAutoUpdateToast('cancel'))}
          >
            {toast.cancelButtonText}
          </Button>
        )}
        {toast.showConfirmButton && (
          <Button
            intent={Intent.PRIMARY}
            small
            onClick={() => dispatch(closeAutoUpdateToast('confirm'))}
          >
            {toast.confirmButtonText}
          </Button>
        )}
      </div>
    </div>
  )
}
