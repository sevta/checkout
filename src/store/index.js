import {createStore , combineReducers} from 'redux'
import {step1} from '../reducers'
export const store = (createStore(combineReducers({
  // reducers here
  step1: step1
})))