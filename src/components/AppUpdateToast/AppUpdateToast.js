import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Toaster,
  Position,
  Button,
  Intent,
} from '@blueprintjs/core'

import { selectAutoUpdateToast } from 'state/electronAutoUpdateToast/selectors'
import { hideAutoUpdateToast } from 'state/electronAutoUpdateToast/actions'
import Spinner from './AppUpdateToast.spinner'


const toaster = Toaster.create({
  position: Position.TOP,
  maxToasts: 1,
})

export default function AutoUpdateToast() {
  const dispatch = useDispatch()
  const toast = useSelector(selectAutoUpdateToast)

  if (!toast.visible) return null

  toaster.show({
    key: toast.toastId,
    timeout: 0,
    icon: toast.icon,
    intent: Intent.PRIMARY,

    message: (
      <div className='au-toast'>
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

        <Spinner progress={toast.progress} />

        <div className='au-toast__actions'>
          {toast.showConfirmButton && (
            <Button
              intent='primary'
              small
              onClick={() => dispatch(hideAutoUpdateToast('confirm'))
              }
            >
              {toast.confirmButtonText}
            </Button>
          )}

          {toast.showCancelButton && (
            <Button
              small
              onClick={() => dispatch(hideAutoUpdateToast('cancel'))
              }
            >
              {toast.cancelButtonText}
            </Button>
          )}
        </div>
      </div>
    ),
  })

  return null
}
