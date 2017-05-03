import AV from './AV'
import { realtime, TextMessage } from './realTime'

function sendToMessage(params) {
  return (dispatch) => {
    //保存消息到reducer
    dispatch(saveMessage(params.message, params.senderUser, params.currentUser))
    // 聊天人之间的对话
    return params.conversation.send(new TextMessage(params.message))
  }
}

function saveMessage(message, senderUser, currentUser) {
  return {
    type: 'MESSSAGE_SAVE',
    message: message,
    senderUser: senderUser,
    currentUser: currentUser
  }
}

function requestRecentMessage(params) {
  return (dispatch) => {
    var messageIterator = params.conversation.createMessagesIterator({ limit: 100 });
    messageIterator
      .next()
      .then((result) => {
        return dispatch(saveServiceMessage(result.value, params.senderUser, params.currentUser))
    })
  }
}

function saveServiceMessage(messages, senderUser, currentUser) {
  return {
    type: 'SAVE_SERVICE_MESSAGE',
    messages: messages,
    senderUser: senderUser,
    currentUser : currentUser
  }
}

function clearMessage() {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export function fetchMessageActionIfNeeded(params = {}) {
  return(dispatch, getState) => {
    if (params.type === 'sendToMessage') {
      return dispatch(sendToMessage(params))
    } else if (params.type === 'received'){
      return dispatch(requestRecentMessage(params))
    } else if (params.type === 'clearMessage') {
      return dispatch(clearMessage())
    }
  }
}
