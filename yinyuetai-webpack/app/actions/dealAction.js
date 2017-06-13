import { Deal } from '../api'
import * as types from '../containers/actionType'

function requestGetDeals(params) {
  return (dispatch) => {
    let initParams = { skip: 0, limit: 10 }
    initParams = Object.assign({}, initParams, params.params)
    Deal.getDeals(initParams, (deals, err) => {
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
    let dealId = { dealId: params.dealId }
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

function destoryDetailDeal() {
  return {
    type: `DESTORY_DETAIL_DEAL`
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
    } else if (params.type === `destoryDetailDeal`) {
      return dispatch(destoryDetailDeal())
    }
  }
}
