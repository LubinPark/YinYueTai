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

export function fetchHomeIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === `getHomePage`) {
      return dispatch(requestGetHomePage(params))
    }
  }
}
