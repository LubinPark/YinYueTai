import Func from '../unit'
import { Home, Deal } from '../api'
import * as types from '../containers/actionType'

//请求 筛选地区的数据
function requestgetLocations () {
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

//请求deals成功但是deals 为空
function searchListNoDeals () {
  return {
    type: `SEARCH_LIST_NO_DEALS`
  }
}

//保存地区数据
function saveLocationsData (locations) {
  return {
    type: `SAVE_LOCATIONS_DATA`,
    locations: locations
  }
}

//请求 筛选的fiter
function requestGetDefaultFilters () {
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

//请求 热门搜索
function requestGetHotSearches () {
  return (dispatch) => {
    Home.getHotSearches((searches) => {
      if (!!searches) {
        dispatch(saveHotSearches(searches[0].attributes.phrases))
      } else {
        return dispatch(searchError())
      }
    })
  }
}

//保存热门搜索
function saveHotSearches (searches) {
  return {
    type: `SAVE_SEARCHES`,
    searches: searches
  }
}

//根据 参数 筛选条件 请求deal
function requestGetSearchDeals (params) {
  return (dispatch) => {
    let initParams = Func.setParams(params)
    Deal.getDeals(initParams, (deals, err) => {
      if (!!deals) {
        if (deals.length === 0) {
          dispatch(searchListNoDeals())
        } else {
          return dispatch(saveSearchDeals(deals))
        }
      } else {
        return dispatch(searchError())
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
        return dispatch(saveSearchDeals(deals))
      } else {
        return dispatch(searchError())
      }
    })
  }
}

//保存 请求的deals
function saveSearchDeals (deals) {
  return {
    type: `SAVE_SEARCHE_LIST_DEALS`,
    deals: deals
  }
}

//请求deals 错误
function searchError (){
  return {
    type: `SEARCH_LIST_ERROR`
  }
}
//保存 搜索框输入后关键字
function saveHistorySearchText(searchText) {
  return {
    type: `SAVE_HISTORY_SEARCH_TEXT`,
    searchText: searchText
  }
}

//清除历史搜索关键字
function deleteHistory() {
  return {
    type: `SEARCH_LIST_DELETE_HISTORY`
  }
}

//请求前显示loading
function isLoading() {
  return {
    type: `SEARCH_LIST_LOADING`,
    loading: true
  }
}

//保存searchText
function saveSearchText(params) {
  return {
    type: `SAVE_SEARCH_TEXT`,
    searchText: params.searchText
  }
}

//点击搜索 清空之前的deals
function destorySearchList() {
  return {
    type: `DESTORY_SEARCH_LIST`
  }
}

//保存 params 到reducer
function saveParams(params) {
  let initParams = Func.setParams(params)
  return {
    type: `SEARCH_LIST_SAVE_PARAMS`,
    params: initParams
  }
}

export function fetchSearchListIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === `getLocations`) {
      return dispatch(requestgetLocations())
    } else if (params.type === `getDefaultFilters`) {
      return dispatch(requestGetDefaultFilters())
    } else if (params.type === `getHotSearches`) {
      return dispatch(requestGetHotSearches())
    } else if(params.type === `getSearchDeals`) {
      dispatch(isLoading())
      dispatch(requestGetSearchDeals(params))
    } else if (params.type === `saveHistorySearchText`) {
      return dispatch(saveHistorySearchText(params.searchText))
    } else if (params.type === `deleteHistory`) {
      return dispatch(deleteHistory())
    } else if (params.type === `saveSearchText`) {
      return dispatch(saveSearchText(params))
    } else if (params.type === `loadingMore`) {
      return dispatch(loadingMore(params))
    } else if (params.type === `destorySearchList`) {
      return dispatch(destorySearchList())
    } else if (params.type === `saveParams`) {
      return dispatch(saveParams(params))
    }
  }
}
