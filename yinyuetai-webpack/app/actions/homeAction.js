import { Home } from '../api'
import * as types from '../containers/actionType'

function requestGetHomePage () {
  return (dispatch) => {
    Home.getHomePage((home, err) => {
      if (!!home) {
        dispatch(saveHomeDate(home))
      }
    })
  }
}

function saveHomeDate (home) {
  return {
    type: `SAVE_HOME_DATA`,
    home: home
  }
}

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
