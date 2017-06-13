import * as types from '../containers/actionType'

var defaultState = {
  home: {}
}

function dealReducer(state = defaultState, action={}) {
  switch (action.type) {
    case types.SAVE_HOME_DATA:
      let home = action.home
      return Object.assign({}, state, { home: home })
      break

    default:
    return state
  }
}

export default dealReducer
