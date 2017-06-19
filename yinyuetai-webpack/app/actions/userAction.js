import { Deal, User } from '../api'
import * as types from '../containers/actionType'

//根据用户id请求 user
function getUserByUserId (params) {
  return (dispatch) => {
    let userId = { userId : params.userId }
    User.getUser(userId, (user, err) => {
      if (!!user) {
        dispatch(saveUser(user))
        dispatch(requestgetDealsByUser(user))
      } else {
        console.log(err);
      }
    })
  }
}

//保存用户信息
function saveUser(user) {
  return {
    type: `SAVE_USER`,
    user: user
  }
}

//根据用户请求 发布的deals
function requestgetDealsByUser (user) {
  return (dispatch) => {
    Deal.getDealsByUser(user,{ limit: 10, skip:0 }, (deals, err) => {
      if (!!deals) {
        return dispatch(saveDeals(deals))
      } else {
        return dispatch(loadingError())
      }
    })
  }
}

//保存用户发布的deals
function saveDeals(deals) {
  return {
    type: `SAVE_DEALS_BY_USER_ID`,
    deals: deals
  }
}

//加载失败
function loadingError () {
  return {
    type: `LOADING_ERROR`,
  }
}

//退出删除user用户
function cleanUser () {
  return {
    type: `CLEAN_USER`
  }
}

export function fetchUserIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === `getUserByUserId`) {
      return dispatch(getUserByUserId(params))
    } else if (params.type === `cleanUser`) {
      return dispatch(cleanUser())
    }
  }
}
