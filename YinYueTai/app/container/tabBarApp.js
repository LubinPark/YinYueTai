import React, { Component } from 'react'
import TabNavigator from 'react-native-tab-navigator'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native'

import Home from '../components/home/home'
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
          title='导航'
          selected={this.state.selectedTab == 'Navigate'}
          onPress={() => this.setState({selectedTab: 'Navigate'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('Navigate')}
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
          title='订阅'
          selected={this.state.selectedTab == 'Subscribe'}
          onPress={() => this.setState({selectedTab: 'Subscribe'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('Subscribe')}
        </TabNavigator.Item>
        <TabNavigator.Item
          title='我的'
          selected={this.state.selectedTab == 'My'}
          onPress={() => this.setState({selectedTab: 'My'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('My')}
        </TabNavigator.Item>
      </TabNavigator>
    )
  }

  _renderRootContent(name) {
    switch (name) {
      case 'Home':
        return <Home />
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
