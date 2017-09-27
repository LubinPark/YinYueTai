import * as types from '../actions/actionTypes'

const initialState = {
  adressBook: [],
  refresh: true,
  noData: false
}

let AdressBook = (state = initialState, action={}) => {
  switch (action.type) {
    
    case types.SAVE_ADRESS_BOOK:
      let adressBook = action.adressBook
      let noData = false
      if (adressBook.length === 0) noData = true
      return Object.assign({}, state, {adressBook: adressBook, refresh: false, noData: noData})
      break

    default:
      return state
  }
}

export default AdressBook
