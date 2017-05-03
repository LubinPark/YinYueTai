import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'

import {
  Send,
  Bubble,
  Composer,
  Message,
  GiftedChat,
  GiftedAvatar,
  LoadEarlier,
  InputToolbar,
  MessageContainer
 } from 'react-native-gifted-chat'

import Loading from '../commonfile/loading'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

var Device = require('../../utils/device')
const { width, height, fadeGray, backView, gray, lightGray, border } = Device

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
          text: 'Hello',
          createdAt: new Date(Date.UTC(2017, 4, 26, 0, 11, 5)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png'
          }
        }
      ]
    })
  }

  render() {

    let titleConfig = { title: 'Park', tintColor: '#fff' }
    let leftButtonConfig = <TouchableWithoutFeedback onPress={()=>this._back()}>
                            <Image source={require('../../img/back.png')} style={backView}/>
                           </TouchableWithoutFeedback>

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={'black'}
          leftButton={leftButtonConfig}
          statusBar={{style: 'light-content'}} />
        <GiftedChat
          messages={this.state.messages}
          user = {{
              _id: 1,
              name: 'Park',
              avatar: 'http://www.qqjay.com/uploads/allimg/160306/1_0PP4Q19.jpg'
            }}
          locale={'zh-cn'}
          isAnimated={true}
          loadEarlier={true}
          renderAvatarOnTop={true}
          minInputToolbarHeight={49}
          isLoadingEarlier={false}  /* 加载历史信息按钮的loading状态 */
          keyboardShouldPersistTaps={'never'}

          onSend={(e)=>this.onSend(e)}
          onLoadEarlier={()=>this._onLoadEarlier()}
          renderLoading={()=>this._renderLoading()}
          renderAvatar={()=>this._renderAvatar()}
          renderLoadEarlier={()=>this._renderLoadEarlier()}

        //renderDay={()=>this._renderDay()}
        //enderTime={()=>this._renderTime()}
        //renderFooter={()=>this._renderFooter()}

        //renderBubble={()=>this._renderBubble()}
        renderMessage={()=>this._renderMessage()}
        //renderMessageText={()=>this._renderMessageText()}
        //renderMessageImage={()=>this._renderMessageImage()}
        //renderCustomView={()=>this._renderCustomView()}

        //renderInputToolbar={()=>this._renderInputToolbar()}
        //renderActions={()=>this._renderActions()}
        //renderAccessory={()=>this._renderAccessory()}
        //onPressActionButton={()=>this._onPressActionButton()}

        renderComposer={()=>this._renderComposer()}
        renderSend={(e)=>this._renderSend(e)}
        />
      </View>
    )
  }

  onSend() {

    var num = _.random(10, 100000)
   var messages = {
      _id: num,
      text: 'copy',
      createdAt: new Date(Date.UTC(2017, 4, 26, 0, 11, 5)),
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://facebook.github.io/react/img/logo_og.png'
      }
    }

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      }
    })
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
      <LoadEarlier
        label={'加载更多'}
        onLoadEarlier={()=>this._onLoadEarlier()}
        wrapperStyle={{backgroundColor: fadeGray}}
        textStyle={{color: lightGray}}
      />
    )
  }

  _onLoadEarlier() {
    //loadEarlier={true} 显示加载历史信息，后调用此函数
    console.log(`加载`);
  }

  _renderAvatar() {
    //聊天对象的头像
    return (
      <GiftedAvatar
        onPress={()=>this._onPressAvatar()}
        user={{_id: 2, name: '123', avatar: 'http://www.qqjay.com/uploads/allimg/160306/1_0PP4Q19.jpg'}}
        textStyle={{color: 'red',width: 100,height: 30}}
        avatarStyle={{borderRadius: 5,backgroundColor:'red'}}
      />
    )
  }

  _onPressAvatar() {
    console.log(`点击头像`);
  }

  _renderBubble() {
    //自定义发送消息(包括文本等，时间，发送时间等)
    return (
      <Bubble
        wrapperStyle={{
          left: { backgroundColor:'red' }
        }}
        {...this.props}
       />
    )
  }

  _renderMessage() {
    //自定义消息 关闭后才可以使用自定义消息
    //自定义全部消息

    var messages = [{
      _id: 10,
      text: 'copy',
      createdAt: new Date(Date.UTC(2017, 4, 26, 0, 11, 5)),
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://facebook.github.io/react/img/logo_og.png'
      },
      img: 'http://www.qqjay.com/uploads/allimg/160306/1_0PP4Q19.jpg'
    }
  ]

    var user = {
      _id: 1,
      name: '111',
      avatar: 'http://www.qqjay.com/uploads/allimg/160306/1_0PP4Q19.jpg'
    }

    return (
      <MessageContainer
        messages={messages}
        user = {user}
      />
    )
  }

  _renderMessageText() {
    //自定义消息文本
    var user = {
        _id: 2,
        name: '111',
        avatar: 'http://www.qqjay.com/uploads/allimg/160306/1_0PP4Q19.jpg'
    }
    return (
      <Message user={user}
        enderAvatar={''}
        position= 'left'

      />
    )
  }

  _renderMessageImage() {
    return (
      <View style={styles.Test}>
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
      <InputToolbar
        containerStyle={{backgroundColor:'red'}}
      />
    )
  }

  _renderComposer() {
    return (
      <View style={[styles.composerView,border]}>
        <Composer
          placeholder={'请输入'}
          onTextChanged={(e)=>this._onTextChanged(e)}
        />
      </View>
    )
  }

  _onTextChanged(e) {
    console.log(e);
  }

  _renderSend() {
    //自定义下方发送按钮
    return (
      <Send
        text='---' //是传到控件的字符串，如果不为空显示发送按钮，
        containerStyle={styles.sendView}
        label='发送'
        textStyle={styles.sendText}
        onSend={(e)=>this.onSend(e)}
      />
    )
  }

  _renderAccessory() {
    //在发送下面添加自定义控件
    return (
      <View style={styles.renderAccessoryView}>
        <Text>自定义</Text>
      </View>
    )
  }

  _onPressActionButton() {
    //发送消息的左边，会取消自定义的 renderActions
    return false
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
  renderDay: {
    alignItems:'center'
  },
  composerView: {
    flex: 1,
    height: 40,
    marginLeft: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor:'#fff'
  },
  sendView: {
    backgroundColor:'#fff',
    height: 49,
    alignItems:'center',
    justifyContent:'center',
  },
  sendText: {
    color: lightGray,
    margin: 10,
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: gray
  },
  renderAccessoryView: {
    width: width,
    backgroundColor:'#fff'
  },
  Test: {
    width: 100,
    height: 100,
    backgroundColor:'red'
  }
})
