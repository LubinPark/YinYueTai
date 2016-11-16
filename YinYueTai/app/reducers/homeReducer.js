import * as types from '../actions/actionTypes'

const initialState = {
  name: 'bin'
}

let home = (state = initialState, action={}) => {
  switch (action.type) {
    case types.REQUEST_HOME:
      var name = 'lu'
      return Object.assign({}, state,{name:name})
      break;

    default:
      return state
  }
}

export default home
