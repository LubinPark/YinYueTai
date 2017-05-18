import * as types from '../containers/actionType'

function saveUserInfo(data) {
  return {
    type: 'SAVE_USER_INFO',
    userInfo: data
  }
}

function requestUserInfo(params) {
  return (dispatch) => {
    let data = { name: 'lubin', age: '25' }
    return dispatch(saveUserInfo(data))
  }
}

export function fetchUserIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === 'userInfo') {
      return dispatch(requestUserInfo(params))
    }
  }
}
