import * as types from '../actions/actionTypes'

const initialState = {
  adressBook: []
}

let AdressBook = (state = initialState, action={}) => {
  switch (action.type) {
    case types.SAVE_ADRESS_BOOK:
      let adressBook = action.adressBook
      return Object.assign({}, state, {adressBook: adressBook})
      break

    default:
      return state
  }
}

export default AdressBook
