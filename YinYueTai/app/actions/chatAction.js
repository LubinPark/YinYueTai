import { Realtime, TextMessage } from 'leancloud-realtime'
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages'

const appId  = 'eGmV4HE4ec4as9E2xocTQKzx-gzGzoHsz'

var realtime = new Realtime({
  appId,
  plugins:[TypedMessagesPlugin] //注册富媒体插件
})

function sendToChat() {
  return (dispatch) => {
    realtime.createIMClient('58e5f959ac502e4957ac450d').then((send) => {
      // 创建与聊天人之间的对话
      return send.createConversation({
        members: ['58fdae0fa22b9d0065a88f0a'],
        name: 'test2',
      })
    }).then((conversation) => {
      // 发送消息
      return conversation.send(new TextMessage('消息'))
    }).then((message)=> {
      // console.log('发送成功！')
    }).catch((err) => {
      console.log(err)
    })
  }
}

function reseivedToChat() {
  return (dispatch) => {
    realtime.createIMClient('58fdae0fa22b9d0065a88f0a').then((received) => {
      received.on('message', (message, conversation) => {
        //message.text 当前聊天的消息
        //conversation 当前聊天的人的信息
      })
    }).catch((err) => {
      console.log(err);
    })
  }
}

export function fetchChatActionIfNeeded(params = {}) {
  return(dispatch, getState) => {
    if (params.type === 'send') {
      return dispatch(sendToChat())
    } else if (params.type === 'received') {
      return dispatch(reseivedToChat())
    } else {
      // console.log(`NONE`);
    }
  }
}
