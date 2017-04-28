import * as types from '../actions/actionTypes'

const initialState = {
  message: [
    {position:'right',uri:'https://facebook.github.io/react/img/logo_og.png',text:'666'},
    {position:'left',uri: 'http://www.qqjay.com/uploads/allimg/160306/1_0PP4Q19.jpg',text:'555'},
    {position:'right',uri:'https://facebook.github.io/react/img/logo_og.png',text:'444'},
    {position:'left',uri: 'http://www.qqjay.com/uploads/allimg/160306/1_0PP4Q19.jpg',text:'333'},
    {position:'right',uri:'https://facebook.github.io/react/img/logo_og.png',text:'2222'},
    {position:'left',uri: 'http://www.qqjay.com/uploads/allimg/160306/1_0PP4Q19.jpg',text:'1111'},
  ]
}

let Message = (state = initialState, action={}) => {
  switch (action.type) {
    case types.MESSSAGE_SAVE:
      let text = action.data
      let item = {
        position: 'right',
        uri: 'https://facebook.github.io/react/img/logo_og.png',
        text: text
      }
      let newMessage = []
      newMessage.push(item)
      for (var i = 0; i < state.message.length; i++) {
        newMessage.push(state.message[i])
      }
      return Object.assign({}, state, {message: newMessage})
      break

    default:
      return state
  }
}

export default Message
