import AV from './AV'
import * as types from './actionTypes'

function tabBarinitialRoute(params) {
  return (dispatch) => {
    AV.User.currentAsync().then((currentUser) => {
      if (!!currentUser) {
        return dispatch(_tabBarinitialRoute({type:'TabBarApp'}))
      } else {
        return dispatch(_tabBarinitialRoute({type:'LoginPage'}))
      }
    })
  }
}

function _tabBarinitialRoute(params) {
  return {
    type: types.TABBAR_INITIAL_ROUTE,
    data: params.type
  }
}

export function fetchTabBarIfNeeded(params = {}) {
  return(dispatch, getState) => {
    if (params.type === 'initialRoute') {
      return dispatch(tabBarinitialRoute())
    }
  }
}
