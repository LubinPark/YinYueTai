import * as types from '../actions/actionTypes'

const initialState = {
  route: ''
}

let TabBar = (state = initialState, action={}) => {
  switch (action.type) {
    //根据用户是否登录判断第一个tarbar
    case types.TABBAR_INITIAL_ROUTE:
      let route = action.data
      return Object.assign({}, state, {route:route})

    default:
      return state
  }
}

export default TabBar
