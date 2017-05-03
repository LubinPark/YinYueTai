import * as types from '../actions/actionTypes'

const initialState = {
  chatList: []
}

let Chat = (state = initialState, action={}) => {
  switch (action.type) {
    //请求对话列表
    case types.CHAT_SAVE_CONVERSATION:
      let chatLists = []
      let users = action.users
      let conversations = action.conversations
      for (var i = 0; i < users.length; i++) {
        let chatList = {
          user: users[i],
          conversation: conversations[i],
          lastMessage: conversations[i].lastMessage ? conversations[i].lastMessage._lctext : ''
        }
        chatLists.push(chatList)
      }
      return Object.assign({}, state, {chatList: chatLists})
        break

    default:
      return state
  }
}

export default Chat
