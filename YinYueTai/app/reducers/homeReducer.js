import * as types from '../actions/actionTypes'

const initialState = {
  loop: [],
  button:[]
}

let Home = (state = initialState, action={}) => {
  switch (action.type) {
    case types.REQUEST_HOME:
      var loop = action.homeData[0].data
      var button = action.homeData[1].data
      return Object.assign({}, state,{loop:loop,button:button})
      break;

    default:
      return state
  }
}

export default Home
