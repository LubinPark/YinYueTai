import _ from 'underscore'
import { InteractionManager } from 'react-native'

import AV from './AV'
import User from '../api/user'
import { realtime } from './realTime'
import Message from '../api/message'

function reseivedToChat(params) {
  return (dispatch) => {
    AV.User.currentAsync().then((currentUser) => {
      Message.requestConversation(currentUser, (listID, conversations, err) => {
        if (!err) {
          return dispatch(searchUsersByIds(listID, conversations))
        }
      })
    })
  }
}

function searchUsersByIds(listID, conversations) {
  return (dispatch) => {
    User.searchUsersByIds(listID,(users, err) => {
      return dispatch(saveUserToChat(users, conversations))
    })
  }
}

function saveUserToChat(users, conversations) {
  return {
    type: 'CHAT_SAVE_CONVERSATION',
    users: users,
    conversations: conversations
  }
}

function pushMessagePage(params) {
  return (dispatch) => {
    let currentUser = {}
    AV.User.currentAsync().then((user)=>{
      currentUser = user
    })
    InteractionManager.runAfterInteractions(() => {
      params.navigator.push({
        id:'MessagePage',
        data: {
          senderUser: params.data.user,
          currentUser: currentUser,
          conversation: params.data.conversation
        }
      })
    })
  }
}

export function fetchChatActionIfNeeded(params = {}) {
  return(dispatch, getState) => {
    if (params.type === 'received') {
      return dispatch(reseivedToChat(params))
    } else if (params.type === 'pushMessagePage'){
      return dispatch(pushMessagePage(params))
    } else {
      console.log(`none`);
    }
  }
}
