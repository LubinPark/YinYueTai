import Deal from '../api/deal'
import * as types from '../containers/actionType'

function saveUserInfo(data) {
  return {
    type: `SAVE_USER_INFO`,
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
    type: `SAVE_DEALS`,
    deals: deals
  }
}

function getDealDetail(params) {
  return (dispatch) => {
    let dealId = {id: params.dealId}
    Deal.getDealById(dealId, (deal, err) => {
      if (!!deal) {
        dispatch(_saveDealDetailSuccess(deal))
      } else {
        dispatch(_saveDealDetailFailed())
      }
    })
  }
}

function _saveDealDetailSuccess(deal) {
  return {
    type: `SAVE_DEAL_DETAIL_SUCCESS`,
    dealDetail: deal
  }
}

function saveUser(params) {
  return {
    type: `SAVE_USER`,
    user: params.user
  }
}

export function fetchDealIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === `getDeals`) {
      return dispatch(requestGetDeals(params))
    } else if (params.type === `getDealDetail`) {
      return dispatch(getDealDetail(params))
    } else if (params.type === `saveDealDetail`) {
      return dispatch(_saveDealDetailSuccess(params.dealDetail))
    } else if (params.type === `saveUser`) {
      return dispatch(saveUser(params))
    }
  }
}
