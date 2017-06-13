import * as types from '../containers/actionType'

var defaultState = {
  deals: [],
  dealDetail: {}
}

function dealReducer(state = defaultState, action={}) {
  switch (action.type) {
    case types.SAVE_DEALS:
      let deals = action.deals
      return Object.assign({}, state, { deals: deals })
      break

    case types.SAVE_DEAL_DETAIL_SUCCESS:
      let dealDetail = action.dealDetail
      return Object.assign({}, state, { dealDetail: dealDetail })
      break

    case types.DESTORY_DETAIL_DEAL:
    return Object.assign({}, state, { dealDetail: {} })

    default:
    return state
  }
}

export default dealReducer
