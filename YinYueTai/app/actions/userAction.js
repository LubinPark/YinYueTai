import AV from './AV'
import * as types from './actionTypes'

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
    })
  }
}

function userlogOut(params) {
  return (dispatch) => {
    AV.User.logOut()
    params.app.replace({
      id:'LoginPage'
    })
    return dispatch(loginOut())
  }
}

function loginOut() {
  return {
    type: 'USER_LOGOUT'
  }
}

function currentUserIsExsit() {
  return (dispatch) => {
    AV.User.currentAsync().then((currentUser) => {
      if (!!currentUser) {
        return dispatch(saveUserInfo(currentUser, 'login'))
      }
    }, (err) => {
      return dispatch(loginFailed(error.message))
    })
  }
}

function pushLoginPage(params) {
  return (dispatch) => {
    params.app.push({
      id: 'LoginPage'
    })
  }
}

export function fetchUserAction(params = {}) {
  return(dispatch, getState) => {
    if (params.type === 'register') {
      return dispatch(userRegister(params))
    } else if (params.type ==='login') {
      return dispatch(userLogin(params))
    } else if (params.type === 'logOut') {
      return dispatch(userlogOut(params))
    } else if (params.type === 'currentUser') {
      return dispatch(currentUserIsExsit())
    } else if (params.type === 'pushLoginPage') {
      return dispatch(pushLoginPage(params))
    } else {
      console.log(`NO SELECT FUNCTION`);
    }
  }
}
