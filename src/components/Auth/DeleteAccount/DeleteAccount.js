import React, { memo } from 'react'
import PropTypes from 'prop-types'

import InputKey from '../InputKey'
import SelectedUserItem from '../SignIn/SignIn.item'

export const DeleteAccount = ({
  email,
  onChange,
  password,
  backToUsersList,
}) => (
  <div className='delete-account'>
    <SelectedUserItem
      user={email}
      title={'auth.removeSelectedAccount'}
      backToUsersList={backToUsersList}
    />
    <InputKey
      name='password'
      value={password}
      onChange={onChange}
      label='auth.enterPassword'
    />
  </div>
)

DeleteAccount.propTypes = {
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  backToUsersList: PropTypes.func.isRequired,
  // handleDeleteAccount: PropTypes.func.isRequired,
}

export default memo(DeleteAccount)
