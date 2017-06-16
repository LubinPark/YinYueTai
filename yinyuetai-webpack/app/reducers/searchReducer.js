import * as types from '../containers/actionType'

var defaultState = {
  locations: [],
  filters: [],
  searches: [],
  deals: []
}

function searchReducer(state = defaultState, action={}) {
  switch (action.type) {
    case types.SAVE_LOCATIONS_DATA:
      let locations = action.locations
      return Object.assign({}, state, { locations: locations })
      break

    case types.SAVE_DEFAULT_FILTERS:
      let filters = action.filters
      return Object.assign({}, state, { filters: filters })
      break;

    case types.SAVE_SEARCHES:
      let searches = action.searches
      return Object.assign({}, state, { searches: searches })
      break

    case types.SAVE_SEARCHE_LIST_DEALS:
      let deals = action.deals
      return Object.assign({}, state, { deals: deals })
      break

    default:
    return state
  }
}

export default searchReducer
