import * as types from '../containers/actionType'

var defaultUserState = {
  userInfo: {},
  users: []
}

function userReducer(state = defaultUserState, action={}) {
  switch (action.type) {
    case types.SAVE_USER_INFO:
      let userInfo = action.userInfo
      return Object.assign({}, state, {userInfo: userInfo})
      break

    case types.SAVE_USERS:
      let users = action.users
      return Object.assign({}, state, {users: users})
      break

    default:
    return state
  }
}

export default userReducer
