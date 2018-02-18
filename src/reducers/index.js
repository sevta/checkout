import {store} from '../store'

const step1State = {
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

export const step1 = (state = step1State , action) => {
  switch (action.type) {
    case 'USER_FORM':
      return {
        ...state
      }
    case 'IS_DROPSHIPPER':
      return {
        ...state ,
        is_dropshipper: action.payload 
      }
    case 'DISABLED':
      return {
        ...state ,
        disabled: action.payload
      }
    case 'INPUT_DROPSHIPPER_NAME':
      return {
        ...state ,
        dropshipper: {
          name: action.payload , 
          phone: state.dropshipper.phone ,
        }
      }
    case 'INPUT_DROPSHIPPER_PHONE':
      return {
        ...state , 
        dropshipper: {
          name: state.dropshipper.name ,
          phone: action.payload
        }
      }
    case 'INPUT_USER':
      return {
        ...state ,
        user: action.payload
      }
    case 'ERROR':
      return {
        ...state , 
        is_error: action.payload.is_error,
        error: action.payload.error
      }
    default: 
      return state
  }
}

const step2State = {
  services_value: 'jne',
  estimate: '',
  idr: '',
  payment: 'wallet',
  payment_method: []
}

export const step2 = (state = step2State , action) => {
  switch(action.type) {
    case 'SERVICE_VAL':
      return {
        ...state , 
        services_value: action.payload
      }
    case 'SERVICE_DETAILS':
      return {
        ...state , 
        idr: action.payload.idr ,
        estimate: action.payload.estimate ,
        payment_method: action.payload.payment_method
      }
    case 'PAYMENT':
      return {
        ...state ,
        payment: action.payload
      }
    default:
      return state
  }
}

const step3State = {
  tax: 2000
}

export const step3 = (state = step3State , action) => {
  switch(action.type) {
    default: 
      return state
  }
}