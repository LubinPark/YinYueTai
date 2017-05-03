import * as types from '../actions/actionTypes'

const initialState = {
  loop: [],
  button:[],
  data: []
}

let Home = (state = initialState, action={}) => {
  switch (action.type) {
    case types.REQUEST_HOME:
      //主页的几个分区的每个数据
      let loop = action.homeData[0].data
      let button = action.homeData[1].data

      let mvFirst = action.homeData[2]
      let pops = action.homeData[3]
      let fans = action.homeData[4]
      let anthor = action.homeData[5]
      let panorama = action.homeData[6]
      let musicer = action.homeData[7]
      let guess = action.homeData[8]

      let data = []
      data.push(mvFirst, pops, fans, anthor, panorama, musicer, guess)
      return Object.assign({}, state,{loop:loop, button:button, data: data})
      break

    default:
      return state
  }
}

export default Home
