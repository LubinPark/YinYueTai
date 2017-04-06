import * as types from './actionTypes'
import AV from './AV'

function userRegister(params) {
  return (dispatch) => {
    var user = new AV.User()
    user.setUsername(params.name)
    user.setEmail(params.account)
    user.setPassword(params.password)
    user.signUp().then((registerUser) => {
      if (!!registerUser) {
        params.navigator.pop()
        return dispatch(saveUserInfo(responseData, 'register'))
      }
    }, (error) => {
      return dispatch(failedRegister(error.message))
    })
  }
}

function saveUserInfo(responseData, userState) {
  return {
    type: 'SAVE_USER_INFO',
    userInfo: responseData,
    userState: userState
  }
}

function failedRegister(responseData) {
  return {
    type: 'FAILED_REGISTER',
    registerErrorInfo: responseData
  }
}

function userLogin(params) {
  return (dispatch) => {
    AV.User.logIn(params.account, params.password).then((loginedUser) => {
      if (!!loginedUser) {
        params.navigator.replace({
          id: 'TabBarApp'
        })
        return dispatch(saveUserInfo(loginedUser, 'login'))
      }
    }, (error) => {
      return dispatch(loginFailed(error.message))
    });
  }
}

function loginFailed(responseData) {
  return {
    type: 'LOGIN_FAILED',
    loginErrorInfo: responseData
  }
}

export function UserAction(params = {}) {
  return(dispatch, getState) => {
    if (params.type === 'register') {
      return dispatch(userRegister(params))
    } else if (params.type ==='login') {
      return dispatch(userLogin(params))
    }
  }
}
