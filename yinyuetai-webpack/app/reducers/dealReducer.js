import * as types from '../containers/actionType'

var defaultState = {
  title: '',
  deals: [],
  dealDetail: {},
  params: {},
  showMore: true
}

function dealReducer(state = defaultState, action={}) {
  switch (action.type) {

    case types.SAVE_DEALS:
      let title = action.title
      let deals = state.deals.concat(action.deals)

      if (action.deals.length === 10) {
        return Object.assign({}, state, { deals: deals ,title: title, showMore: true })
        break
      } else {
        return Object.assign({}, state, { deals: deals ,title: title, showMore: false })
        break
      }

    case types.SAVE_DEAL_DETAIL_SUCCESS:
      let dealDetail = action.dealDetail
      return Object.assign({}, state, { dealDetail: dealDetail })
      break

    case types.DESTORY_DETAIL_DEAL:
    return Object.assign({}, state, { dealDetail: {} })

    case types.DESTORY_DEAL_LIST:
      return Object.assign({}, state, { deals: [], showMore: true })
      break

    case types.DEAL_LIST_NO_DEAL:
      return Object.assign({}, state, {showMore: false} )
      break

    case types.SAVE_PARAMS:
      return Object.assign({}, state, {params: action.params} )
      break

    default:
    return state
  }
}

export default dealReducer
