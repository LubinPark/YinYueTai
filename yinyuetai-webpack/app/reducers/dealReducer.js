import * as types from '../containers/actionType'

var defaultState = {
  title: '',
  deals: [],
  dealDetail: {}
}

function dealReducer(state = defaultState, action={}) {
  switch (action.type) {
    
    case types.SAVE_DEALS:
      let deals = action.deals
      let title = action.title
      return Object.assign({}, state, { deals: deals ,title: title})
      break

    case types.SAVE_DEAL_DETAIL_SUCCESS:
      let dealDetail = action.dealDetail
      return Object.assign({}, state, { dealDetail: dealDetail })
      break

    case types.DESTORY_DETAIL_DEAL:
    return Object.assign({}, state, { dealDetail: {} })

    case types.DESTORY_DEAL_LIST:
      return Object.assign({}, state, { deals: {} })
      break

    default:
    return state
  }
}

export default dealReducer
