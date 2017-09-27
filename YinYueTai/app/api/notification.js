import AV from '../actions/AV'

let NotificationRequest = {}

NotificationRequest.sendNotification = (message, currentUser, callback) => {
  // let content = {
  //   id: 'id',
  //   type: 'message',
  //   action: 'com.yinyuetai',
  //   alert: message.getText(),
  //   badge: 'Increment',
  //   from: message.from,
  //   text: currentUser.get('username') + message.getText()
  // }
  // let notification = {
  //   content: content,
  //   user: currentUser.id,
  //   production: 'dev'
  // }
  //数据弄好发送未实现,需要推送证书
  AV.Push.send({
    channels: [ 'public' ],
    data: {
      alert: 'public message'
    }
  })
}

module.exports = NotificationRequest
