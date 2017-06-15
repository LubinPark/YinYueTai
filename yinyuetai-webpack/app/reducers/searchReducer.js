import * as types from '../containers/actionType'

var defaultState = {
  locations: []
}

function searchReducer(state = defaultState, action={}) {
  switch (action.type) {
    case types.SAVE_LOCATIONS_DATA:
      let locations = action.locations
      return Object.assign({}, state, { locations: locations })
      break

    default:
    return state
  }
}

export default searchReducer
