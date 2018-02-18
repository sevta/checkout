import {createStore , combineReducers} from 'redux'
import {step1 , step2 , step3} from '../reducers'

export const store = (createStore(combineReducers({
  // reducers here
  step1 ,
  step2 ,
  step3
})))