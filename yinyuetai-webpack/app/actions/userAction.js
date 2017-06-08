import Deal from '../api/deal'
import * as types from '../containers/actionType'

function requestgetDealsByUser (params) {
  return (dispatch) => {
    Deal.getDealsByUser(params.user,{ limit: 10, skip:0 }, (deals, err) => {
      if (!!deals) {
        return dispatch(saveDeals(deals))
      } else {
        return dispatch(loadingError())
      }
    })
  }
}

function loadingError () {
  return {
    type: `LOADING_ERROR`,
  }
}

function saveDeals(deals) {
  return {
    type: `SAVE_DEALS_BY_USER_ID`,
    deals: deals
  }
}

export function fetchUserIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === `getDealsByUser`) {
      return dispatch(requestgetDealsByUser(params))
    }
  }
}
