import AV from './AV'
import User from '../api/user'
import * as types from './actionTypes'
import { InteractionManager } from 'react-native'

function getAdressBook() {
  return (dispatch) => {
    return dispatch(searchUsers())
  }
}

function searchUsers() {
  return (dispatch) => {
    User.searchUsers((users, err) => {
      if (!!users) {
        User.currentUser((currentUser, err) => {
          let newUsers = []
          for (var i = 0; i < users.length; i++) {
            if (currentUser.id !== users[i].id) {
              newUsers.push(users[i])
            }
          }
          return dispatch(saveAdressBook(newUsers))
        })
      }
    })
  }
}

function saveAdressBook(users) {
  return {
    type: 'SAVE_ADRESS_BOOK',
    adressBook: users
  }
}

function pushToMessage(params) {
  return (dispatch) => {
    let currentUser = {}
    AV.User.currentAsync().then((user)=>{
      currentUser = user
    })
    InteractionManager.runAfterInteractions(() => {
      params.navigator.push({
        id:'MessagePage',
        data: {
          senderUser: params.senderUser,
          currentUser: currentUser,
          conversation: undefined
        }
      })
    })
  }
}

export function fetchAdressBookIfNeeded(params = {}) {
  return(dispatch, getState) => {
    if (params.type === 'getAdressBook') {
      return dispatch(getAdressBook())
    } else if (params.type === 'pushToMessage') {
      return dispatch(pushToMessage(params))

    }
  }
}
