import * as types from '../actions/actionTypes'

const initialState = {
  authorInfo: {},
  mostWatch: []
}

let Player = (state = initialState, action={}) => {
  switch (action.type) {

    case types.REQUEST_AUTHOR_INFO:
      //authorInfo 里面有同艺人其他mv列表，收录该mv的悦单，猜你喜欢等数据
      let authorInfo = action.authorInfo
      return Object.assign({}, state,{authorInfo: authorInfo})
      break;

    case types.REQUEST_MOST_WATCH:
      //mostWatch 大部分还是看了的数据
      let mostWatch = action.mostWatch
      return Object.assign({}, state,{mostWatch: mostWatch})
      break;

    case types.CLEAN_PLAY_DATA:
      //当退出时清空
      return Object.assign({}, state, {authorInfo: {}, mostWatch: []})
      break;

    default:
      return state
  }
}

export default Player
