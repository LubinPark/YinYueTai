import * as types from '../actions/actionTypes'

const initialState = {
  loop: [],
  button:[],
  mvFirst:{},
  pops:{},
  fans:{},
  anthor:{},
  panorama:{},
  musicer:{},
  guess:{}
}

let Home = (state = initialState, action={}) => {
  switch (action.type) {
    case types.REQUEST_HOME:
      var loop = action.homeData[0].data
      var button = action.homeData[1].data
      var mvFirst = action.homeData[2]
      var pops = action.homeData[3]
      var fans = action.homeData[4]
      var anthor = action.homeData[5]
      var panorama = action.homeData[6]
      var musicer = action.homeData[7]
      var guess = action.homeData[8]
      return Object.assign({}, state,{loop:loop,
                                      button:button,
                                      mvFirst:mvFirst,
                                      pops:pops,
                                      fans:fans,
                                      anthor:anthor,
                                      panorama:panorama,
                                      musicer:musicer,
                                      guess:guess})
      break;

    default:
      return state
  }
}

export default Home
