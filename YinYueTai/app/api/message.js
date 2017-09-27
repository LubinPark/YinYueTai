import AV from '../actions/AV'
import { realtime, TextMessage } from '../actions/realTime'

let MessageRequest = {}

MessageRequest.requestConversation = (currentUser, callback) => {
  let listID = []
  realtime.createIMClient(currentUser.id).then((received) => {
    received.getQuery()
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
      callback(listID, conversations, null)
    }).catch((err) => {
      callback(null, null, err)
    })
  })
}

MessageRequest.sendMessage = (params, callback) => {
  params.conversation.send(new TextMessage(params.message))
  .then((message) => {
    callback(message, null)
  }).catch((err) => {
    callback(null, err)
  })
}

MessageRequest.createConversation = (params, callback) => {
  realtime.createIMClient(params.currentUser.id)
  .then((received) => {
    return received.createConversation({
      members: [params.senderUser.id],
      name: params.senderUser.get('username'),
      unique: true
    })
  }).then((conversation)=>{
    callback(conversation, null)
  }).catch((err) => {
    callback(null ,err)
  })
}

module.exports = MessageRequest
