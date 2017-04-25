import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'
import { GiftedChat } from 'react-native-gifted-chat'

import Loading from '../commonfile/loading'
import CommonStatusBar from '../commonfile/commonStatusBar'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

var Device = require('../../utils/device')
const { width, height, fadeGray } = Device

export default class MessagePage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png'
          }
        }
      ]
    })
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      }
    })
  }

  render() {

    let titleConfig = <Text style={styles.title}>消息</Text>
    let leftButtonConfig = <TouchableWithoutFeedback onPress={()=>this._back()}>
                            <Image source={require('../../img/back.png')} style={styles.backView}/>
                           </TouchableWithoutFeedback>

    return (
      <View style={styles.container}>
        <CommonStatusBar />
        <NavigationBar title={titleConfig} leftButton={leftButtonConfig} tintColor={'black'}/>
        <GiftedChat
          messages={this.state.messages}
          user={{ _id: 1 }}
          isAnimated={true}
          loadEarlier={true}
          renderAvatarOnTop={true}
          minInputToolbarHeight={49}
          isLoadingEarlier={false}  /* 加载历史信息按钮的loading状态 */
          keyboardShouldPersistTaps={'never'}

          onSend={(e)=>this.onSend(e)}
        //renderLoading={()=>this._renderLoading()}
          onLoadEarlier={()=>this._onLoadEarlier()}
        //renderAvatar={()=>this._renderAvatar()}
        //renderLoadEarlier={()=>this._renderLoadEarlier()}

          onPressAvatar={(e)=>this._onPressAvatar(e)}
          onLongPress={(e)=>this._onLongPress(e)}
          imageProps={this.state.messages}

        //renderBubble={()=>this._renderBubble()}
        //renderMessage={()=>this._renderMessage()}
        //renderMessageText={()=>this._renderMessageText()}
        //renderMessageImage={()=>this._renderMessageImage()}
        //renderCustomView={()=>this._renderCustomView()}
        //renderDay={()=>this._renderDay()}
        //renderTime={()=>this._renderTime()}
        //renderFooter={()=>this._renderFooter()}

        //renderInputToolbar={()=>this._renderInputToolbar()}
        //renderActions={()=>this._renderActions()}
        //renderSend={()=>this._renderSend()}
        //renderAccessory={()=>this._renderAccessory()}
        //onPressActionButton={()=>this._onPressActionButton()}
        onInputTextChanged={(text)=>this._onInputTextChanged(text)}
        />
      </View>
    )
  }

  _renderLoading() {
    // 加载页面之前的loading
    var num = _.random(0, 2)
    return (
      <Loading num={num}/>
    )
  }

  _renderLoadEarlier() {
    //自定义加载更多buttom的
    return (
      <View style={styles.loadingMoreBtn}>
      </View>
    )
  }

  _onLoadEarlier() {
    //loadEarlier={true} 显示加载历史信息，后调用此函数
    console.log(`加载更多`);
  }

  _renderAvatar() {
    //聊天对象的头像
    return (
      <View style={styles.avatarView}>
      </View>
    )
  }

  _onPressAvatar() {
    console.log(`点击头像`);
    return (
      <View style={styles.avatarView}>
      </View>
    )
  }

  _renderBubble() {
    //自定义发送消息(包括文本等，时间，发送时间等)
    return (
      <View style={styles.bubbleView}>
        <Text>消息</Text>
      </View>
    )
  }

  _onLongPress(e) {
    //此方法无效
    console.log(e);
  }

  _renderMessage() {
    //自定义消息 关闭后才可以使用自定义消息
    //自定义全部消息
    return (
      <View style={styles.renderMessageView}>
      </View>
    )
  }

  _renderMessageText() {
    //自定义消息文本
    return (
      <View style={styles.renderMessageText}>
        <Text>消息</Text>
      </View>
    )
  }

  _renderMessageImage() {
    //此方法无效
    return (
      <View style={styles.Test}>
      <Text>123123
      </Text>
      </View>
    )
  }

  _renderCustomView() {
    //添加=>自定义消息 可以直接在原来中再添加控件
    return (
      <View style={styles.Test}>
      </View>
    )
  }

  _renderDay() {
    //在发送消息上面显示的时间自定义
    return (
      <View style={styles.renderDay}>
        <Text>时间</Text>
      </View>
    )
  }

  _renderTime() {
    //自定义消息发送显示的时间
    return (
      <View style={styles.renderDay}>
        <Text>00:00</Text>
      </View>
    )
  }

  _renderFooter() {
    //在发送消息下面自定义
    return (
      <View style={styles.renderDay}>
        <Text>自定义</Text>
      </View>
    )
  }

  _renderInputToolbar() {
    //自定义下方发送消息
    return (
      <View style={styles.renderInputToolbarView}>
        <Text>自定义下方发送消息</Text>
      </View>
    )
  }

  _renderActions() {
    //自定义下方发送消息的左边
    return (
      <View style={styles.renderActionsView}>
        <Text>+</Text>
      </View>
    )
  }

  _renderSend() {
    //自定义下方发送消息的右边
    return (
      <View style={styles.renderSendView}>
        <Text>+</Text>
      </View>
    )
  }

  _renderAccessory() {
    //在发送下面添加自定义控件 和发送消息一样大
    return (
      <View style={styles.renderAccessoryView}>
        <Text>自定义</Text>
      </View>
    )
  }

  _onPressActionButton() {
    //发送消息的左边，会取消自定义的 renderActions
    return true
  }

  _onInputTextChanged(text) {
    console.log(text);
  }

  _back() {
    this.context.app.navigator.pop()
  }

}

const styles = StyleSheet.create({
  container: {
    width: width,
    height:height,
    backgroundColor:'#fff'
  },
  title: {
    color: '#fff'
  },
  backView: {
    marginTop: 8,
    marginLeft: 5,
    tintColor: '#fff',
    width: 30,
    height: 30
  },
  avatarView: {
    width:44,
    height: 44,
    backgroundColor:'red',
    borderRadius: 22
  },
  loadingMoreBtn: {
    width:width - 100,
    height: 20,
    marginLeft: 50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'red'
  },
  renderMessageView: {
    padding: 5,
    backgroundColor:'red'
  },
  renderMessageText: {
    paddingTop: 10,
    paddingLeft: 10
  },
  bubbleView: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: fadeGray
  },
  renderDay: {
    alignItems:'center'
  },
  renderInputToolbarView: {
    width: width
  },
  renderActionsView: {
    height: 49,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  renderSendView: {
    height: 49,
    paddingRight: 10,
    justifyContent: 'center'
  },
  renderAccessoryView: {
    width: width,
    backgroundColor:'#fff'
  },
  actionButton: {
    width: width,
    height: 100,
    backgroundColor:'red'
  },
  Test: {
    width: 100,
    height: 100,
    backgroundColor:'blue'
  }
})
