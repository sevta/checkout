import React , {Component} from 'react';
import {connect} from 'react-redux'

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax: 2000
    }
  }

  prev = () => {
    this.props.prev('step2')
  }

  render() {
    const data = this.props.state
    const delivery = this.props.state2
    const {
      tax
    } = this.props.state3

    return (
      <div className='step3'>
        <div className="information-label">Confirmation</div>
        <div className="user-details-container">
          <div className="user--details">Name <span>{data.user.name}</span></div>
          <div className="user--details">Phone Number <span>{data.user.phone}</span></div>
          <div className="user--details">Email <span>{data.user.email}</span></div>
          <div className="user--details">Dropshipper Name <span>{data.dropshipper.name || '-'}</span></div>
          <div className="user--details">Dropshipper Phone <span>{data.dropshipper.phone || '-'}</span></div>
          <div className="user--details">Address <span>{data.user.address}</span></div>
        </div>

        <div className="services-container">
          <div className="form-g form-step3">
            <label htmlFor="">Delivery Details</label>
            <span>{delivery.services_value} {delivery.estimate}</span>
          </div>
          <div className="form-g form-step3">
            <label htmlFor="">Delivery Price</label>
            <span>{delivery.idr}</span>
          </div>
          <div className="form-g form-step3">
            <label htmlFor="">Service Price</label>
            <span>{tax}</span>
          </div>
          <div className="form-g form-step3">
            <label htmlFor="">Total Price</label>
            <span>{delivery.idr + tax}</span>
          </div>
          <div className="form-g form-step3">
            <label htmlFor="">Payment Method</label>
            <span>{delivery.payment}</span>
          </div>
          
        </div>
        <button className='finish'>Finish</button>
        <button className='prev' onClick={this.prev}>Back</button>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    state: state.step1,
    state2: state.step2,
    state3: state.step3
  }
}

export default connect(stateToProps)(Step3)