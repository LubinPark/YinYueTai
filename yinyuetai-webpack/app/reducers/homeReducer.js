import * as types from '../containers/actionType'

var defaultState = {
  home: {},
  searches: []
}

function dealReducer(state = defaultState, action={}) {
  switch (action.type) {
    
    case types.SAVE_HOME_DATA:
      let home = action.home
      return Object.assign({}, state, { home: home })
      break

    case types.SAVE_SEARCHES:
      let searches = action.searches
      return Object.assign({}, state, { searches: searches })
      break

    default:
    return state
  }
}

export default dealReducer
