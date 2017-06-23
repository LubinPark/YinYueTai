import * as types from '../containers/actionType'

var defaultState = {
  title: '',
  locations: [],
  params: {},
  filters: [],
  deals: [],
  dealDetail: {},
  showMore: true,
  nodeal: false,
  loading: true
}

function dealReducer(state = defaultState, action={}) {
  switch (action.type) {

    case types.SAVE_DEALS:
      let deals = state.deals.concat(action.deals)
      if (action.deals.length === 10) {
        return Object.assign({}, state, { deals: deals, showMore: true, loading: false})
        break
      } else {
        return Object.assign({}, state, { deals: deals, showMore: false, loading: false})
        break
      }

    case types.SAVE_DEAL_DETAIL_SUCCESS:
      let dealDetail = action.dealDetail
      return Object.assign({}, state, { dealDetail: dealDetail })
      break

    case types.DESTORY_DETAIL_DEAL:
    return Object.assign({}, state, { dealDetail: {} })

    case types.DESTORY_DEAL_LIST:
      return Object.assign({}, state, { deals: [], showMore: true, nodeal: false, loading: true })
      break

    case types.DEAL_LIST_NO_DEAL:
       return Object.assign({}, state, { showMore: false, nodeal: true, loading: false })
      break

    case types.SAVE_PARAMS_FILTERS:
      return Object.assign({}, state, { params: action.params, filters:action.filters })
      break

    case types.DEAL_LIST_SAVE_PARAMS:
      return Object.assign({}, state, { params: action.params })
      break

    case types.SAVE_LOCATIONS_DATA:
      let locations = action.locations
      return Object.assign({}, state, { locations: locations })
      break

    case types.SAVE_DEFAULT_FILTERS:
      let filters = action.filters
      return Object.assign({}, state, { filters: filters })
      break

    case types.DEAL_LIST_SAVE_TITLE:
      return Object.assign({}, state, { title: action.title })
      break

    case types.DEAL_LIST_LODING:
      return Object.assign({}, state, { loading: true, nodeal: false})
      break

    case types.DEAL_LIST_DELETE_PARAMS:
      return Object.assign({}, state, {params: {}})
      break

    default:
    return state
  }
}

export default dealReducer
