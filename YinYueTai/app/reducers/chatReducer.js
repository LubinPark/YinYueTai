import * as types from '../actions/actionTypes'

const initialState = {
  chatList: [],
  refresh: true,
  noData: false
}

let Chat = (state = initialState, action={}) => {
  switch (action.type) {
    //请求对话列表
    case types.CHAT_SAVE_CONVERSATION:
      let chatLists = []
      let users = action.users
      let conversations = action.conversations
      let noData = false
      for (var i = 0; i < users.length; i++) {
        let chatList = {
          user: users[i],
          conversation: conversations[i],
          lastMessage: conversations[i].lastMessage ? conversations[i].lastMessage._lctext : ''
        }
        chatLists.push(chatList)
      }
      if (users.length === 0) noData = true
      return Object.assign({}, state, {chatList: chatLists, refresh: false, noData: noData})
        break

    default:
      return state
  }
}

export default Chat
