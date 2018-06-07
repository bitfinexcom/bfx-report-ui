import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Auth extends PureComponent {
  static propTypes = {
    checkAuth: PropTypes.func.isRequired,
    isValid: PropTypes.bool,
    setKey: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(event) {
    if (event.target.name === 'check') {
      this.props.checkAuth();
    } else {
      this.props.setKey(this.state.key, this.state.secret)
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h5>Auth</h5>
        {
          this.props.isValid ? <div>Auth Success</div> :
            <div>Auth Fail</div>
        }
        <p className='App-intro'>
          Enter your API Key: <input name='key' type='text' onChange={this.handleChange} /><br />
          Enter your API Secret: <input name='secret' type='text' onChange={this.handleChange} /><br />
          <button onClick={this.handleClick}>Submit</button>
        </p>
        <button name='check' onClick={this.handleClick}>CheckAuth</button>
      </div>
    )
  }
}

export default Auth
