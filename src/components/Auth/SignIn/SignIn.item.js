import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Icon from 'icons'

export const SignInUserItem = ({
  user,
  title,
  backToUsersList,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <p className='sign-in-user--title'>
        {t(title)}
      </p>
      <div
        className='sign-in-user--item'
        onClick={() => backToUsersList()}
      >
        <p className='sign-in-user--item-title'>
          {user}
        </p>
        <Icon.CHEVRON_DOWN />
      </div>
    </>
  )
}

SignInUserItem.propTypes = {
  user: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  backToUsersList: PropTypes.func.isRequired,
}

export default memo(SignInUserItem)
