import { Home } from '../api'
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

export function fetchSearchListIfNeeded(params={}) {
  return(dispatch, getState) => {
    if (params.type === `getLocations`) {
      return dispatch(requestgetLocations())
    }
  }
}
