import { Home } from '../api'
import * as types from '../containers/actionType'

//请求主页数据
function requestGetHomePage () {
  return (dispatch) => {
    Home.getHomePage((home, err) => {
      if (!!home) {
        dispatch(saveHomeDate(home))
      }
    })
  }
}

//保存主页数据
function saveHomeDate (home) {
  return {
    type: `SAVE_HOME_DATA`,
    home: home
  }
}

//获取热搜数据
function requestGetHotSearches () {
  return (dispatch) => {
    Home.getHotSearches((searches, err) => {
      if (!!searches) {
        let searchArray = searches[0].attributes.phrases
        dispatch(saveSearches(searchArray))
      }
    })
  }
}

//保存热搜数据
function saveSearches (searches) {
  return {
    type: `SAVE_SEARCHES`,
    searches: searches
  }
}

export function fetchHomeIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === `getHomePage`) {
      return dispatch(requestGetHomePage())
    } else if (params.type === `getHotSearches`) {
      return dispatch(requestGetHotSearches())
    }
  }
}
