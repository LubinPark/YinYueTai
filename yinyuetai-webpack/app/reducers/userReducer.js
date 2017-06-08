import * as types from '../containers/actionType'

var defaultState = {
  deals: [],
  user: {}
}

function userReducer(state = defaultState, action={}) {
  switch (action.type) {
    case types.SAVE_DEALS_BY_USER_ID:
      let deals = action.deals
      return Object.assign({}, state, { deals: deals })
      break

    case types.SAVE_USER:
      let user = action.user
      return Object.assign({}, state, { user: user })
      break

    case types.LOADING_ERROR:
      return Object.assign({}, state, { deals: [] })
      break

    default:
    return state
  }
}

export default userReducer
