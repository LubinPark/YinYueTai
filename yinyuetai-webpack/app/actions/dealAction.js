import Deal from '../api/deal'
import * as types from '../containers/actionType'

function saveUserInfo(data) {
  return {
    type: 'SAVE_USER_INFO',
    userInfo: data
  }
}

function requestGetDeals() {
  return (dispatch) => {
    Deal.getDeals((deals, err) => {
      if (!!deals) {
        return dispatch(saveDeals(deals))
      } else {
        return dispatch(saveUsersFailed())
      }
    })
  }
}

function saveDeals(deals) {
  return {
    type: 'SAVE_DEALS',
    deals: deals
  }
}

export function fetchDealIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === 'getDeals') {
      return dispatch(requestGetDeals(params))
    }
  }
}
