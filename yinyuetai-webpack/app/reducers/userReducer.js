import * as types from '../containers/actionType'

var defaultUserState = {
  userInfo: {}
}

function userReducer(state = defaultUserState, action={}) {
  switch (action.type) {
    case types.SAVE_USER_INFO:
      let userInfo = action.userInfo
      return Object.assign({},state, {userInfo: userInfo})
      break

    default:
    return state
  }
}

export default userReducer
