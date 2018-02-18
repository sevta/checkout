import React, { Component } from 'react';

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

  sendAsDropshipper = e => {
    const {is_dropshipper} = this.state
    this.setState({is_dropshipper: !is_dropshipper})
    if (!this.state.is_dropshipper) {
      this.setState({disabled: false})
    } else {
      this.setState({disabled: true , dropshipper_err_name: '' , dropshipper: {name: '' , phone: ''}})
    }
  }

  inputDropshipperForm = e => {
    let value = e.target.value
    let dropshipper_name = this.refs.dropshipper_name.value
    let dropshipper_phone = this.refs.dropshipper_phone.value
    this.setState({dropshipper: {name: dropshipper_name , phone: dropshipper_phone}} , () => {
      console.log(this.state)
    })
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
    })
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
    } = this.state

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

    if (!this.isEmail(this.state.user.email)) {
      isError = true
      error.user_email = 'email not valid'
    }

    if (this.state.is_dropshipper && dropshipper.name.length <= 0) {
      isError = true
      error.dropshipper_name = 'name cannot be empty'
    } 

    if (isError) {
      console.log('err')
      this.setState({is_error: true , error: error} , () => console.log(this.state))
    } else {
      console.log('done')
      this.setState({is_false: false , error: error} , () => console.log(this.state))
      this.props.done(this.state)
    }
  }

  submit = () => {
    this.validate()
  } 

  renderError = error => {
    if (this.state.is_error) {
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
    } = this.state 

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

export default Step1;