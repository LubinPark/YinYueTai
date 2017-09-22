import * as types from '../actions/actionTypes'

const initialState = {
  messages: [],
  conversation: undefined
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
        uri: !!currentUser.get('userPic') ? currentUser.get('userPic') : '',
        text: message
      }
      let newMessage = []
      newMessage.push(item)
      for (var i = 0; i < state.messages.length; i++) {
        newMessage.push(state.messages[i])
      }
      return Object.assign({}, state, {messages: newMessage, conversation: state.conversation})
      break

    case types.SAVE_CONVERSATION:
      return Object.assign({}, state, {conversation: action.conversation, messages: state.messages})
      break

    case types.SAVE_SERVICE_MESSAGE:
      //根据对话，请求的消息数据
      let messages = []
      for (var i = action.messages.length - 1; i >= 0; i--) {
        let currentUrl = !!action.currentUser.get('userPic') ? action.currentUser.get('userPic') : ''
        let senderUrl = !!action.senderUser.get('userPic') ? action.senderUser.get('userPic') : ''
        let item = {
          position: (action.messages[i].from === action.currentUser.id) ? 'right' : 'left',
          text: action.messages[i]._lctext ? action.messages[i]._lctext : '',
          uri: (action.messages[i].from === action.currentUser.id) ? currentUrl : senderUrl
        }
        messages.push(item)
      }
      return Object.assign({}, state, {messages: messages, conversation: state.conversation})
      break

    case types.CLEAR_MESSAGE:
      //当退出页面清空当前的数据
      return Object.assign({}, state, {messages: [], conversation: undefined})

      break
    default:
      return state
  }
}

export default Message
