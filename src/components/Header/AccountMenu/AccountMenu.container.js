import { connect } from 'react-redux'

import { getEmail } from 'state/query/selectors'
import { logout } from 'state/auth/actions'

import AccountMenu from './AccountMenu'

const mapStateToProps = state => ({
  email: getEmail(state),
})

const mapDispatchToProps = {
  logout,
}

const AccountMenuContainer = connect(mapStateToProps, mapDispatchToProps)(AccountMenu)

export default AccountMenuContainer
