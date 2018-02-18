import {store} from '../store'

const step1State = {
  dropshipper: {
    name: '',
    phone: ''
  },
  user: {
    name: '',
    phone: '',
    address: '',
    email: ''
  }
}

export const step1 = (state = step1State , action) => {

  switch (action.type) {
    case 'USER_FORM':
      return {
        ...state
      }
    default: 
      return state
  }

}