var AV = require('../../AVConfig')

import * as types from '../containers/actionType'

function saveUserInfo(data) {
  return {
    type: 'SAVE_USER_INFO',
    userInfo: data
  }
}

function requestUserInfo(params) {
  return (dispatch) => {
    //调用云端，调试
    dispatch(requestUsers())
    let data = { name: 'lubin', age: '25' }
    return dispatch(saveUserInfo(data))
  }
}

function requestUsers() {
  return (dispatch) => {
    AV.Cloud.rpc('searchUsers').then((users)=> {
      return dispatch(saveUsers(users))
    }, (err) => {
      return dispatch(saveUsersFailed())
    })
  }
}

function saveUsers(users) {
  return {
    type: 'SAVE_USERS',
    users: users
  }
}

export function fetchUserIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === 'userInfo') {
      return dispatch(requestUserInfo(params))
    }
  }
}
