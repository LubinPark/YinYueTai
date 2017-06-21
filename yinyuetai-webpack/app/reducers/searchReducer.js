import _ from 'underscore'
import * as types from '../containers/actionType'

var defaultState = {
  locations: [],
  filters: [],
  searches: [],
  deals: [],
  searchHistoryArray: [],
  error: false,
  nodata: false,
  loading: true,
  searchText: ``,
  showMore: true
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
      let deals = state.deals.concat(action.deals)
      if (action.deals.length === 10) {
        return Object.assign({}, state, { deals: deals, nodata: false, error: false, loading: false, showMore: true })
        break
      } else {
        return Object.assign({}, state, { deals: deals, nodata: false, error: false, loading: false, showMore: false })
        break
      }

    case types.SAVE_HISTORY_SEARCH_TEXT:
      let searchText = action.searchText
      let searchHistoryArray = state.searchHistoryArray
      let newSearchHisttoryArray = []

      newSearchHisttoryArray.push(searchText)
      for (var i = 0; i < searchHistoryArray.length; i++) {
        newSearchHisttoryArray.push(searchHistoryArray[i])
      }
      newSearchHisttoryArray = _.uniq(newSearchHisttoryArray)
      return Object.assign({}, state, { searchHistoryArray: newSearchHisttoryArray })
      break

    case types.SEARCH_LIST_DELETE_HISTORY:
      return Object.assign({}, state, { searchHistoryArray: [] })
      break

    case types.SEARCH_LIST_ERROR:
      return Object.assign({}, state, { searchHistoryArray: [], error: true, loading: false })
      break
    case types.SEARCH_LIST_NO_DEALS:
      return Object.assign({}, state, { nodata:true, deals:[],loading: false })
      break

    case types.SEARCH_LIST_LOADING:
      return Object.assign({}, state, { loading: action.loading })
      break

    case types.SAVE_SEARCH_TEXT:
      return Object.assign({}, state, { searchText: action.searchText })
      break

    case types.DESTORY_SEARCH_LIST:
      return Object.assign({}, state, { deals: [] })
      break

    default:
    return state
  }
}

export default searchReducer
