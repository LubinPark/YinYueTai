// import * as types from '../actions/actionType'

var defaultUserState = {
  isFetching: false,
  items: [1,2,3,4,5]
}

function userReducer(state = defaultUserState, action={}) {
  return Object.assign({}, defaultUserState)
}

export default userReducer
