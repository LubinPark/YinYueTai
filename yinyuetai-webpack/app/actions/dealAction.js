import Func from '../unit'
import { Deal, Home } from '../api'
import * as types from '../containers/actionType'

//请求deals
function requestGetDeals(params) {
  showLoading()
  return (dispatch) => {
    let initParams = Func.setParams(params)
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

//加载更多
function loadingMore(params) {
  return (dispatch) => {
    let initParams = Func.setParams(params)
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

function showLoading () {
  console.log(`123`);
  return {
    type: `DEAL_LIST_LODING`
  }
}

//deals 为空
function noDeals() {
  return {
    type: `DEAL_LIST_NO_DEAL`
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
  let initParams = Func.setParams(params)
  return {
    type: `SAVE_PARAMS`,
    params: initParams
  }
}

//请求地区
function getLocations() {
  return (dispatch) => {
    Home.getLocations((locations, err) => {
      if (!!locations) {
        dispatch(saveLocationsData(locations))
      } else {
        return dispatch(searchError())
      }
    })
  }
}

//保存地区
function saveLocationsData (locations) {
  return {
    type: `SAVE_LOCATIONS_DATA`,
    locations:locations
  }
}

//请求 筛选的fiter
function getDefaultFilters () {
  return (dispatch) => {
    Home.getDefaultFilters((filters, err) => {
      if (!!filters) {
        return dispatch(_saveDefaultFilters(filters))
      }
    })
  }
}

//保存 filter 数据
function _saveDefaultFilters (filters) {
  return {
    type: `SAVE_DEFAULT_FILTERS`,
    filters: filters
  }
}

//标题地区变化乱码 直接保存
function saveTitle(params) {
  return {
    type: `DEAL_LIST_SAVE_TITLE`,
    title: params.title
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
    } else if (params.type === `getLocations`) {
      return dispatch(getLocations())
    } else if (params.type === `getDefaultFilters`) {
      return dispatch(getDefaultFilters())
    } else if (params.type === `saveTitle`) {
      return dispatch(saveTitle(params))
    }
  }
}
