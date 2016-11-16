import React, {Component} from 'react'
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'

import Home from '../components/home/home'
const { width, height } = Dimensions.get('window')

export default class TabBarApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home',
    }
  }
  // renderIcon={() => <Image source={require("./img/0.png")} />}
  // renderSelectedIcon={() => <Image source={require("./img/select_0.png")} />}

  render() {
    return (
      <TabNavigator barTintColor="white">
        <TabNavigator.Item
          title='首页'
          selected={this.state.selectedTab == 'home'}
          onPress={() => this.setState({selectedTab: 'home'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('home')}
        </TabNavigator.Item>
        <TabNavigator.Item
          title='电影'
          selected={this.state.selectedTab == 'movie'}
          onPress={() => this.setState({selectedTab: 'movie'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('movie_detail')}
        </TabNavigator.Item>
        <TabNavigator.Item
          title='视频'
          selected={this.state.selectedTab == 'other'}
          onPress={() => this.setState({selectedTab: 'other'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('other')}
        </TabNavigator.Item>
        <TabNavigator.Item
          title='设置'
          selected={this.state.selectedTab == 'setting'}
          onPress={() => this.setState({selectedTab: 'setting'})}
          selectedTitleStyle={{color: 'gray'}}
        >
          {this._renderRootContent('setting')}
        </TabNavigator.Item>
      </TabNavigator>
    )
  }

  _renderRootContent(name) {
    switch (name) {
      case 'home':
        return <Home />
        break;
      default:
        return (
          <View style={styles.view}>
            <Text>未找到该页面</Text>
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
