import AV from './AV'

import { Realtime, TextMessage } from 'leancloud-realtime'
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages'

const appId  = 'eGmV4HE4ec4as9E2xocTQKzx-gzGzoHsz'

var realtime = new Realtime({
  appId,
  plugins:[TypedMessagesPlugin] //注册富媒体插件
})
module.exports = {
  realtime: realtime,
  TextMessage: TextMessage
}
