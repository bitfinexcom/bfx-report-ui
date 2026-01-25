import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Overlay, Button, Intent } from '@blueprintjs/core'

import { hideAutoUpdateToast } from 'state/electronAutoUpdateToast/actions'
import { selectAutoUpdateToast } from 'state/electronAutoUpdateToast/selectors'
import Spinner from './AppUpdateToast.spinner'

import './_AppUpdateToast.scss'

export default function AppUpdateOverlay() {
  const dispatch = useDispatch()
  const toast = useSelector(selectAutoUpdateToast)

  return (
    <Overlay
      isOpen={toast.visible}
      hasBackdrop={false}
      enforceFocus={false}
      autoFocus={false}
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      usePortal={false}
      className='au-update-overlay-root'
    >
      <div className='au-update-overlay'>
        <div className='au-update-overlay__inner'>
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
                  intent={Intent.PRIMARY}
                  small
                  onClick={() => dispatch(hideAutoUpdateToast('confirm'))
                  }
                >
                  {toast.confirmButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  )
}
