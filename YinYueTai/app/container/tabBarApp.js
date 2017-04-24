import React, { Component } from 'react'
import TabNavigator from 'react-native-tab-navigator'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native'

import HomePage from '../components/home/homePage'
import ChatPage from '../components/chat/chatPage'
import SettingPage from '../components/setting/settingPage'

const { width, height } = Dimensions.get('window')

export default class TabBarApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'Home',
    }
  }
  // renderIcon={() => <Image source={require("./img/0.png")} />}
  // renderSelectedIcon={() => <Image source={require("./img/select_0.png")} />}

  render() {
    return (
      <TabNavigator barTintColor="white">
        <TabNavigator.Item
          title='首页'
          selected={this.state.selectedTab == 'Home'}
          onPress={() => this.setState({selectedTab: 'Home'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('Home')}
        </TabNavigator.Item>
        <TabNavigator.Item
          title='V榜'
          selected={this.state.selectedTab == 'VList'}
          onPress={() => this.setState({selectedTab: 'VList'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('VList')}
        </TabNavigator.Item>
        <TabNavigator.Item
          title='消息'
          selected={this.state.selectedTab == 'Chat'}
          onPress={() => this.setState({selectedTab: 'Chat'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('Chat')}
        </TabNavigator.Item>
        <TabNavigator.Item
          title='我的'
          selected={this.state.selectedTab == 'Setting'}
          onPress={() => this.setState({selectedTab: 'Setting'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('Setting')}
        </TabNavigator.Item>
      </TabNavigator>
    )
  }

  _renderRootContent(name) {
    switch (name) {
      case 'Home':
        return <HomePage />
        break;

      case 'Setting':
        return <SettingPage />
        break;

      case  'Chat':
        return <ChatPage />
        break;

        break;
      default:
        return (
          <View style={styles.view}>
            <Text>未找到该页面{name}</Text>
          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  view: {
    width:width,
    height:height,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#ffffff'
  }
})
