import * as types from '../actions/actionTypes'

const initialState = {
  authorInfo: {},
  mostWatch: []
}

let Player = (state = initialState, action={}) => {
  switch (action.type) {
    case types.REQUEST_AUTHOR_INFO:
      var authorInfo = action.authorInfo
      return Object.assign({}, state,{authorInfo: authorInfo})
      break;

    case types.REQUEST_MOST_WATCH:
      var mostWatch = action.mostWatch
      return Object.assign({}, state,{mostWatch: mostWatch})
      break;

    default:
      return state
  }
}

export default Player
