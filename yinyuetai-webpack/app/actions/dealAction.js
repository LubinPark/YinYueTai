import { Deal } from '../api'
import * as types from '../containers/actionType'

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
    let dealId = {dealId: params.dealId}
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

export function fetchDealIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === `getDeals`) {
      return dispatch(requestGetDeals(params))
    } else if (params.type === `getDealDetail`) {
      return dispatch(getDealDetail(params))
    } else if (params.type === `saveDealDetail`) {
      return dispatch(_saveDealDetailSuccess(params.dealDetail))
    }
  }
}
