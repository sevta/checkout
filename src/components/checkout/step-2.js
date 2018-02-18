import React , {Component} from 'react'
import {connect} from 'react-redux'

class Step2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      services_value: 'jne',
      estimate: '',
      idr: '',
      payment: 'wallet',
      payment_method: []
    }
  }

  componentWillMount = () => {
    this.serviecesDetails('jne')
  }

  componentDidMount = () => {
    console.log(this.props.state2)
  }

  serviecesDetails = val => {
    switch(val) {
      case 'jne':
        this.props.dispatch({
          type: 'SERVICE_DETAILS',
          payload: {
            idr: 15000 , 
            estimate: '2 Days' , 
            payment_method: [
              {label: 'Wallet' , value: 'wallet'} , 
              {label: 'Virtual Account' , value: 'virtual_account'}
            ]
          }
        })
        break;
      case 'gosend':
        this.props.dispatch({
          type: 'SERVICE_DETAILS',
          payload: {
            idr: 35000 , 
            estimate: 'Half Days' , 
            payment_method: [
              {label: 'Wallet' , value: 'wallet'} , 
            ]
          }
        })
        break;
      case 'sicepat':
        this.props.dispatch({
          type: 'SERVICE_DETAILS',
          payload: {
            idr: 10000 , 
            estimate: '1 Days' , 
            payment_method: [
              {label: 'Wallet' , value: 'wallet'} , 
              {label: 'Bank Transfer' , value: 'bank_transfer'},
              {label: 'Virtual Account' , value: 'virtual_account'}
            ]
          }
        })
        break;
    }
  }

  selectServices = e => {
    let value = e.target.value
    this.props.dispatch({
      type: 'SERVICE_VAL',
      payload: value
    })

    this.serviecesDetails(value)
    console.log(this.props.state2)
  }

  selectPayment = e => {
    let value = e.target.value 
    this.props.dispatch({
      type: 'PAYMENT',
      payload: value
    })
    console.log(this.props.state2)
  }

  nextStep = () => {
    this.props.done('step3')
    this.props.deliveryData(this.state)
  }

  checkPaymentMethod = obj => {
    this.props.state2.payment === obj.value
    // fix me
    
  }

  prevStep = () => {
    this.props.prev('step1')
  }

  render() {
    const data = this.props.state
    const {
      idr ,
      estimate ,
      payment_method , 
      payment
    } = this.props.state2

    return (
      <div className='step2'>
        <div className="user-details-container">
          <div className="user--details">Name <span>{data.user.name}</span></div>
          <div className="user--details">Phone Number <span>{data.user.phone}</span></div>
          <div className="user--details">Dropshipper Name <span>{data.dropshipper.name || '-'}</span></div>
          <div className="user--details">Dropshipper Phone <span>{data.dropshipper.phone || '-'}</span></div>
        </div>

        <div className="services-container">

          <div className="form-g services-form">
            <label>Delivery Service</label>
            <div className="check-box">
              <input type="radio" value='jne'
                onChange={this.selectServices}
                checked={this.props.state2.services_value === 'jne'}
              />
              <label htmlFor="">JNE</label>
            </div>
            <div className="check-box">
              <input type="radio" value='gosend'
                onChange={this.selectServices}
                checked={this.props.state2.services_value === 'gosend'}
              />
              <label htmlFor="">Go Send</label>
            </div>
            <div className="check-box">
              <input type="radio" value='sicepat'
                onChange={this.selectServices}
                checked={this.props.state2.services_value === 'sicepat'}
              />
              <label htmlFor="">Si Cepat</label>
            </div>
          </div>

          <div className="form-g">
            <label htmlFor="">Delivery Price</label>
            <span>{idr}</span>
          </div>
          
          <div className="form-g">
            <label htmlFor="">Delivery Estimate</label>
            <span>{estimate}</span>
          </div>
          
          <div className="form-g">
            <label htmlFor="">Payment Method</label>
            {payment_method.map((obj , i) => (
              <div className="payement-box" key={i+1}>
                <label htmlFor="">{obj.label}</label>
                <input type="radio" value={obj.value} onChange={this.selectPayment} 
                  checked={this.props.state2.payment === obj.value}/>
              </div>
            ))}
          </div>

          <button className="btn-next" onClick={this.nextStep}>Next</button>
          <button className="btn-prev" onClick={this.prevStep}>Prev</button>

        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    state: state.step1,
    state2: state.step2
  }
}

export default connect(stateToProps)(Step2)
