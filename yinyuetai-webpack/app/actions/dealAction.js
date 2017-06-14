import { Deal } from '../api'
import * as types from '../containers/actionType'

function requestGetDeals(params) {
  return (dispatch) => {
    let initParams = { skip: 0, limit: 10 }
    initParams = Object.assign({}, initParams, params.params)
    Deal.getDeals(initParams, (deals, err) => {
      if (!!deals) {
        return dispatch(saveDeals(deals, params.title))
      } else {
        return dispatch(saveUsersFailed())
      }
    })
  }
}

function saveDeals(deals, title) {
  return {
    type: `SAVE_DEALS`,
    deals: deals,
    title: title
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

function destoryDealList() {
  return {
    type: `DESTORY_DEAL_LIST`
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
    } else if (params.type === `destoryDealList`) {
      return dispatch(destoryDealList())
    }
  }
}
