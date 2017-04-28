import * as types from '../actions/actionTypes'

const initialState = {
  chatList: []
}

let Chat = (state = initialState, action={}) => {
  switch (action.type) {
    case types.CHAT_SAVE_CONVERSATION:
      let chatList = state.chatList
      let data= action.data
      let chat = {
        creator: data.creator,
        numbers: data.members,
        name: data.get('name'),
        uri: data.uri ? data.uri : 'http://www.qqjay.com/uploads/allimg/160306/1_0PP4Q19.jpg',
        lastMessage: data.lastMessage._lctext
      }
      chatList.push(chat)
      return Object.assign({}, state, {chatList: chatList})
        break

    default:
      return state
  }
}

export default Chat
