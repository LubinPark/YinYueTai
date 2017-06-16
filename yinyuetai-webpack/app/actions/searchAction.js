import { Home, Deal } from '../api'
import * as types from '../containers/actionType'

function requestgetLocations () {
  return (dispatch) => {
    Home.getLocations((locations, err) => {
      if (!!locations) {
        dispatch(saveLocationsData(locations))
      }
    })
  }
}

function saveLocationsData (locations) {
  return {
    type: `SAVE_LOCATIONS_DATA`,
    locations: locations
  }
}

function requestGetDefaultFilters () {
  return (dispatch) => {
    Home.getDefaultFilters((filters, err) => {
      if (!!filters) {
        return dispatch(_saveDefaultFilters(filters))
      }
    })
  }
}

function _saveDefaultFilters (filters) {
  return {
    type: `SAVE_DEFAULT_FILTERS`,
    filters: filters
  }
}

function requestGetHotSearches () {
  return (dispatch) => {
    Home.getHotSearches((searches) => {
      if (!!searches) {
        dispatch(saveHotSearches(searches[0].attributes.phrases))
      }
    })
  }
}

function saveHotSearches (searches) {
  return {
    type: `SAVE_SEARCHES`,
    searches: searches
  }
}

function requestGetSearchDeals (params) {
  return (dispatch) => {

    let initParams = { skip: 0, limit: 10 }
    let data = params.params
    let dealType = ``

    if (data.selectDealType === `采购`) {
      dealType = `买`
    } else if (data.selectDealType === `货源`) {
      dealType = `卖`
    } else {
      dealType = `全部`
    }

    let newParam = {
      dealType: dealType,
      location: data.selectLocation,
      delivery: data.delivery,
      prepare_time: data.prepare_time,
      product_origin: data.product_origin,
      searchText: data.searchText
    }

    initParams = Object.assign({}, initParams, newParam)
    Deal.getDeals(initParams, (deals, err) => {
      if (!!deals) {
        return dispatch(saveSearchDeals(deals))
      } else {
        return dispatch(saveUsersFailed())
      }
    })
  }
}

function saveSearchDeals (deals) {
  return {
    type: `SAVE_SEARCHE_LIST_DEALS`,
    deals: deals
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
      return dispatch(requestGetSearchDeals(params))
    }
  }
}
