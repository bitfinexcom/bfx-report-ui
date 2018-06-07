import { connect } from 'react-redux'
import Orders from './Orders'
// import actions from '../../state/auth/actions'

function mapStateToProps(state = {}) {
  return {
    orders: state.orders.orders,
  }
}

// const mapDispatchToProps = dispatch => ({
// setKey: (key, secret) => {
// dispatch(actions.setApiKey(key, secret))
// },
// })

const OrdersContainer = connect(mapStateToProps)(Orders)

export default OrdersContainer
