import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Auth extends PureComponent {
  static propTypes = {
    setKey: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick() {
    this.props.setKey(this.state.key)
  }

  handleChange(event) {
    this.setState({ key: event.target.value })
  }

  render() {
    return (
      <p className='App-intro'>
        Enter your API Key: <input type='text' onChange={this.handleChange} />
        <button onClick={this.handleClick}>Submit</button>
      </p>
    )
  }
}

export default Auth
