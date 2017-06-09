import { Deal, User } from '../api'
import * as types from '../containers/actionType'

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

function saveUser(user) {
  return {
    type: `SAVE_USER`,
    user: user
  }
}

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

function saveDeals(deals) {
  return {
    type: `SAVE_DEALS_BY_USER_ID`,
    deals: deals
  }
}

function loadingError () {
  return {
    type: `LOADING_ERROR`,
  }
}

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
