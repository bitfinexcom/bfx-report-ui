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
    this.props.setKey(this.state.key, this.state.secret)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h5>Auth</h5>
        <p className='App-intro'>
          Enter your API Key: <input name='key' type='text' onChange={this.handleChange} /><br />
          Enter your API Secret: <input name='secret' type='text' onChange={this.handleChange} /><br />
          <button onClick={this.handleClick}>Submit</button>
        </p>
      </div>
    )
  }
}

export default Auth
