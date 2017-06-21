import { Deal } from '../api'
import * as types from '../containers/actionType'

//请求deals
function requestGetDeals(params) {
  return (dispatch) => {
    let initParams = { skip: 0, limit: 10 }
    initParams = Object.assign({}, initParams, params.params)
    Deal.getDeals(initParams, (deals, err) => {
      if (!!deals) {
        if (deals.length > 0) {
          return dispatch(saveDeals(deals, params.title))
        }
      } else {
        return dispatch(saveUsersFailed())
      }
    })
  }
}

//deals 为空
function noDeals() {
  return {
    type: `DEAL_LIST_NO_DEAL`
  }
}

//加载更多
function loadingMore(params) {
  return (dispatch) => {
    let initParams = { skip: params.skip, limit: 10 }
    initParams = Object.assign({}, initParams, params.params)
    Deal.getDeals(initParams, (deals, err) => {
      if (!!deals) {
        if (deals.length > 0) {
          return dispatch(saveDeals(deals, params.params.location))
        } else {
          return dispatch(noDeals())
        }
      } else {
        return dispatch(saveUsersFailed())
      }
    })
  }
}


//保存deals
function saveDeals(deals, title) {
  return {
    type: `SAVE_DEALS`,
    deals: deals,
    title: title
  }
}

//根据dealid 请求 deal 详情
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

//保存deal 的详情
function _saveDealDetailSuccess(deal) {
  return {
    type: `SAVE_DEAL_DETAIL_SUCCESS`,
    dealDetail: deal
  }
}

//退出页面 删除详情数据
function destoryDetailDeal() {
  return {
    type: `DESTORY_DETAIL_DEAL`
  }
}

//退出页面 删除deals
function destoryDealList() {
  return {
    type: `DESTORY_DEAL_LIST`
  }
}

//保存 主页到列表的参数
function saveParams(params) {
  return {
    type: `SAVE_PARAMS`,
    params: params.params
  }
}

export function fetchDealIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === `getDeals`) {
      return dispatch(requestGetDeals(params))
    } else if (params.type === `saveParams`) {
      return dispatch(saveParams(params))
    } else if (params.type === `getDealDetail`) {
      return dispatch(getDealDetail(params))
    } else if (params.type === `saveDealDetail`) {
      return dispatch(_saveDealDetailSuccess(params.dealDetail))
    } else if (params.type === `destoryDetailDeal`) {
      return dispatch(destoryDetailDeal())
    } else if (params.type === `destoryDealList`) {
      return dispatch(destoryDealList())
    } else if (params.type === `loadingMore`) {
      return dispatch(loadingMore(params))
    }
  }
}
