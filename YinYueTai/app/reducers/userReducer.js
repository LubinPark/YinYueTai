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
      //成功注册和登录后保存用户的基本信息
      let userState = action.userState
      let userInfo = action.userInfo
      if (userState == 'login') {
        return Object.assign({}, state, {userInfo: authorInfo, loginState: 'SUCCESS'})
      } else {
        return Object.assign({}, state, {userInfo: authorInfo, registerState: 'SUCCESS'})
      }
      break;

    case types.FAILED_REGISTER:
      //当用户注册失败
      let registerErrorInfo = action.registerErrorInfo
      return Object.assign({}, state, {registerErrorInfo: registerErrorInfo, registerState: 'FAILED'})
      break;

    case types.LOGIN_FAILED:
      //当用户登录失败
      let loginErrorInfo = action.loginErrorInfo
      return Object.assign({}, state, {loginErrorInfo: loginErrorInfo, loginState: 'FAILED'})
      break;

    default:
      return state
  }
}

export default User
