import React, { Component } from 'react';
import {connect} from 'react-redux'

class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_dropshipper: false,
      disabled: true,
      dropshipper: {
        name: '',
        phone: ''
      },
      user: {
        name: '',
        phone: '',
        address: '',
        email: ''
      },
      is_error: false,
      counter: 120,
      error: {},
    }
  }

  componentDidMount = () => {
    console.log(this.props.state)
  }

  sendAsDropshipper = e => {
    let self = this
    const {is_dropshipper} = this.state
    this.setState({is_dropshipper: !is_dropshipper} , () => {
      this.props.dispatch({
        type: 'IS_DROPSHIPPER',
        payload: self.state.is_dropshipper
      })
    })
    //


    console.log(this.props.state)
    if (!this.state.is_dropshipper) {
      this.setState({disabled: false})
      this.props.dispatch({
        type: 'DISABLED',
        payload: false
      })
    } else {
      this.setState({disabled: true , dropshipper_err_name: '' , dropshipper: {name: '' , phone: ''}})
      this.props.dispatch({
        type: 'DISABLED',
        payload: true
      })
      this.props.dispatch({ type: 'CLEAR_DROPSHIPPER_VAL' })
    }
  }

  inputDropshipperForm = e => {
    let self = this.state
    let value = e.target.value
    let dropshipper_name = this.refs.dropshipper_name.value
    let dropshipper_phone = this.refs.dropshipper_phone.value
    this.props.dispatch({
      type: 'INPUT_DROPSHIPPER_NAME',
      payload: dropshipper_name
    })
    this.props.dispatch({
      type: 'INPUT_DROPSHIPPER_PHONE',
      payload: dropshipper_phone
    })
    console.log(this.props.state)
  }

  inputUserForm = (e , data) => {
    let user_name = this.refs.user_name.value
    let user_phone = this.refs.user_phone.value
    let user_address = this.refs.user_address.value
    let user_email = this.refs.user_email.value
    this.setState({
      user: {
        name: user_name,
        phone: user_phone,
        address: user_address,
        email: user_email
      }
    } , () => {
      this.props.dispatch({
        type: 'INPUT_USER' ,
        payload: this.state.user
      })
    })
    console.log(this.props.state)
    if (data) {
      let text_max = 120
      let text_length = e.target.value.length
      let text_remaining = text_max - text_length
      this.setState({counter: text_remaining})
    }
  }

  isEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

  validate = () => {
    const {
      user , 
      dropshipper
    } = this.props.state

    let isError = false
    const error = {}

    if (user.name.length <= 0) {
      isError = true
      error.user_name = 'name cannot be empty'
    } 

    if (user.phone.length < 6 || user.phone.length > 20 ) {
      isError = true
      error.user_phone = 'min 6 && max 20'
    } 

    // -------- uncomment if done tester

    // if (!this.isEmail(this.state.user.email)) {
    //   isError = true
    //   error.user_email = 'email not valid'
    // }

    if (this.state.is_dropshipper && dropshipper.name.length <= 0) {
      isError = true
      error.dropshipper_name = 'name cannot be empty'
    } 

    if (isError) {
      console.log('err')
      console.log(this.props.state)
      // this.setState({is_error: true , error: error} , () => console.log(this.state))
      this.props.dispatch({
        type: 'ERROR',
        payload: {
          is_error: true ,
          error: error
        }
      })
    } else {
      console.log('done')
      // this.setState({is_false: false , error: error} , () => console.log(this.state))
      this.props.dispatch({
        type: 'ERROR',
        payload: {
          is_error: false ,
          error: error
        }
      })
      this.props.done(this.state)
      console.log(this.props.state)
    }
  }

  submit = () => {
    this.validate()
  } 

  renderError = error => {
    if (this.props.state.is_error) {
      return (
        <span className="error">{error}</span>
      )
    }
  }

  render() {
    const {
      is_dropshipper ,
      disabled , 
      dropshipper ,
      user , 
      counter , 
      error , 
      is_error ,
    } = this.props.state 

    return (
      <div className='step1'>
        <form onSubmit={this.submit}>
          <div className="dropshipper-form">
            <div>
              <input type="checkbox" checked={is_dropshipper} onChange={this.sendAsDropshipper}/> Send as Dropshiper
              <input 
                type="text" 
                disabled={disabled} 
                placeholder='dropshipper name'
                name='name'
                ref='dropshipper_name'
                value={dropshipper.name}
                required
                onChange={this.inputDropshipperForm}
              />
              {this.renderError(error.dropshipper_name)}

              <input 
                type="number" 
                disabled={disabled} 
                placeholder='dropshipper phone'
                name='phone'
                ref='dropshipper_phone'
                value={dropshipper.phone}
                required
                onChange={this.inputDropshipperForm}
              />
            </div>
          </div>

          <div className="user-form">
            <div className='form-g'>
              <label>Name</label>
              <input 
                type="text" 
                value={user.name} 
                onChange={this.inputUserForm}
                ref='user_name'
              />
              {this.renderError(error.user_name)}

            </div>
            <div className="form-g">
              <label>Phone</label>
              <input 
                type="number" 
                value={user.phone} 
                onChange={this.inputUserForm}
                ref='user_phone'
              />
              {this.renderError(error.user_phone)}
            </div>
            <div className="form-g">
              <label>Address</label>
              <textarea name="" id="" cols="30" rows="10" 
                value={user.address} 
                onChange={(e , data) => this.inputUserForm(e , 'with-counter')}
                ref='user_address'
                maxLength={120}
                ></textarea>
              <span>Character left {counter}</span>
            </div>
            <div className="form-g">
              <label>Email</label>
              <input 
                type="email" 
                value={user.email}
                onChange={this.inputUserForm}
                ref='user_email'
              />
              {this.renderError(error.user_email)}
            </div>
          </div>
        </form>
        <button onClick={this.submit}>Next</button>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    state: state.step1
  }
}

export default connect(stateToProps)(Step1);