import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Intent } from '@blueprintjs/core'
import _isFinite from 'lodash/isFinite'

import Icon from 'icons'
import { closeAutoUpdateToast } from 'state/electronAutoUpdateToast/actions'
import { selectAutoUpdateToast } from 'state/electronAutoUpdateToast/selectors'

import Spinner from './AppUpdateToast.spinner'

const ICON_MAP = {
  error: <Icon.WARNING className='au-toast__icon au-toast__icon--error' />,
  info: <Icon.INFO_CIRCLE className='au-toast__icon au-toast__icon--info' />,
  success: <Icon.CHECKMARK_CIRCLE className='au-toast__icon au-toast__icon--success' />,
  question: <Icon.QUESTION_CIRCLE className='au-toast__icon au-toast__icon--question' />,
}

const AppUpdateToast = () => {
  const dispatch = useDispatch()
  const toast = useSelector(selectAutoUpdateToast)

  if (!toast?.visible) {
    return null
  }

  const {
    icon, title, text, showConfirmButton, showCancelButton,
    confirmButtonText, cancelButtonText, progress,
  } = toast

  const showSpinner = _isFinite(progress)
  const iconElement = ICON_MAP[icon]

  return (
    <div className='au-toast'>
      {showSpinner && <Spinner progress={progress} />}
      {!showSpinner && iconElement}
      {title && <div className='au-toast__title'>{title}</div>}
      {text && <div className='au-toast__text'>{text}</div>}
      {(showConfirmButton || showCancelButton) && (
        <div className='au-toast__actions'>
          {showCancelButton && (
            <Button
              small
              className='au-toast__cancel-btn'
              onClick={() => dispatch(closeAutoUpdateToast('cancel'))}
            >
              {cancelButtonText || 'Cancel'}
            </Button>
          )}
          {showConfirmButton && (
            <Button
              intent={Intent.PRIMARY}
              small
              onClick={() => dispatch(closeAutoUpdateToast('confirm'))}
            >
              {confirmButtonText || 'OK'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default AppUpdateToast
