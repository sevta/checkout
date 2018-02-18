import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Checkout from './components/checkout/checkout'

class Routers extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Checkout}/>
      </div>
    );
  }
}

export default Routers;