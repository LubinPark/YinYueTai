import * as types from '../containers/actionType'

var defaultState = {
  deals: []
}

function dealReducer(state = defaultState, action={}) {
  switch (action.type) {
    case types.SAVE_DEALS:
      let deals = action.deals
      return Object.assign({}, state, { deals: deals })
      break

    default:
    return state
  }
}

export default dealReducer
