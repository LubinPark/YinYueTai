import * as types from '../actions/actionTypes'

const initialState = {
  userInfo: {},
  registerErrorInfo: '',
  loginErrorInfo: '',

  registerState: 'NONE',
  loginState: 'NONE'
}

let User = (state = initialState, action={}) => {
  switch (action.type) {

    case types.SAVE_USER_INFO:
      var userState = action.userState
      var userInfo = action.userInfo
      if (userState == 'login') {
        return Object.assign({}, state, {userInfo: authorInfo, loginState: 'SUCCESS'})
      } else {
        return Object.assign({}, state, {userInfo: authorInfo, registerState: 'SUCCESS'})
      }
      break;

    case types.FAILED_REGISTER:
      var registerErrorInfo = action.registerErrorInfo
      return Object.assign({}, state, {registerErrorInfo: registerErrorInfo, registerState: 'FAILED'})
      break;

    case types.LOGIN_FAILED:
      var loginErrorInfo = action.loginErrorInfo
      return Object.assign({}, state, {loginErrorInfo: loginErrorInfo, loginState: 'FAILED'})
      break;

    default:
      return state
  }
}

export default User
