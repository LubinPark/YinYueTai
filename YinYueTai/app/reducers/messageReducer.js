import * as types from '../actions/actionTypes'

const initialState = {
  messages: []
}

let Message = (state = initialState, action={}) => {
  switch (action.type) {
    case types.MESSSAGE_SAVE:
      //保存发送的消息后，更新列表
      let message = action.message
      let senderUser = action.senderUser
      let currentUser = action.currentUser
      let item = {
        position: 'right',
        uri: currentUser.get('userPic').get('url'),
        text: message
      }
      let newMessage = []
      newMessage.push(item)
      for (var i = 0; i < state.messages.length; i++) {
        newMessage.push(state.messages[i])
      }
      return Object.assign({}, state, {messages: newMessage})
      break

    case types.SAVE_SERVICE_MESSAGE:
      //根据对话，请求的消息数据
      let messages = []
      for (var i = action.messages.length - 1; i >= 0; i--) {
        let item = {
          position: (action.messages[i].from === action.currentUser.id) ? 'right' : 'left',
          text: action.messages[i]._lctext,
          uri: (action.messages[i].from === action.currentUser.id) ? action.currentUser.get('userPic').get('url') : action.senderUser.get('userPic').get('url'),
        }
        messages.push(item)
      }
      return Object.assign({}, state, {messages: messages})
      break

    case types.CLEAR_MESSAGE:
      //当退出页面清空当前的数据
      return Object.assign({}, state, {})

      break
    default:
      return state
  }
}

export default Message
