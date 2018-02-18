import React, { Component } from 'react';

// component
import Step2 from './step-2'
import Step1 from './step-1'
import Step3 from './step-3'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step1: false,
      step: 'step1',
      data_user: null,
      data_services: null
    }
  }
  
  has_submit = (data) => {
    this.setState({step: 'step2' , data_user: data})
  }

  goTo(step) {
    this.setState({step: step})
  }

  doneFromStep2 = step => {
    this.setState({step: step})
  }

  renderStep(step) {
    switch(step) {
      case 'step1': 
        return <Step1 done={(data) => this.has_submit(data)}/>
        break;
      case 'step2':
        return <Step2 data={this.state.data_user} done={this.doneFromStep2}/>
        break;
      case 'step3':
        return <Step3 />
        break;
    }
  }

  render() {
    const {
      step1 , 
      step2
    } = this.state
    return (
      <div className='wrapper'>
        <div className="text">Checkout
          <span onClick={(data) => this.goTo('step1')}>1</span>
          <span onClick={(data) => this.goTo('step2')}>2</span>
          <span onClick={(data) => this.goTo('step3')}>3</span>
        </div>
        <div className="container-checkout">
          {this.renderStep(this.state.step)}
        </div>
      </div>
    );
  }
}

export default Checkout;