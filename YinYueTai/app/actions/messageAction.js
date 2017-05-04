import AV from './AV'
import { realtime, TextMessage } from './realTime'
import { InteractionManager } from 'react-native'

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
    if (params.conversation === undefined) {
      realtime
      .createIMClient(params.currentUser.id)
      .then((received) => {
        return received.createConversation({
          members: [params.senderUser.id],
          name: params.senderUser.get('username'),
          unique: true
        })
      }).then((conversation) => {
        dispatch(saveConversation(conversation))
        InteractionManager.runAfterInteractions(() => {
          var messageIterator = conversation.createMessagesIterator({ limit: 10 });
          messageIterator
            .next()
            .then((result) => {
              return dispatch(saveServiceMessage(result.value, params.senderUser, params.currentUser))
          })
        })
      })
    } else {
      dispatch(saveConversation(params.conversation))
      InteractionManager.runAfterInteractions(() => {
        var messageIterator = params.conversation.createMessagesIterator({ limit: 100 });
        messageIterator
          .next()
          .then((result) => {
            return dispatch(saveServiceMessage(result.value, params.senderUser, params.currentUser))
        })
      })
    }
  }
}

function saveConversation(conversation) {
  return {
    type: 'SAVE_CONVERSATION',
    conversation: conversation
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
