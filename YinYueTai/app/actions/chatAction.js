import _ from 'underscore'
import { InteractionManager } from 'react-native'

import AV from './AV'
import User from '../api/user'
import { realtime } from './realTime'

function reseivedToChat(params) {
  let listID = []
  return (dispatch) => {
    AV.User.currentAsync().then((currentUser) => {
      realtime.createIMClient(currentUser.id).then((received) => {
      received
        .getQuery()
        .descending('updatedAt')
        .containsMembers([currentUser.id])
        .withLastMessagesRefreshed(true)
        .find()
        .then((conversations)=> {
          for (var i = 0; i < conversations.length; i++) {
            let members = conversations[i].members
            if (members[0] === currentUser.id) {
              listID.push(members[1])
            } else {
              listID.push(members[0])
            }
          }
          return dispatch(searchUsersByIds(listID, conversations))
        })
        .catch(console.error.bind(console));
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
