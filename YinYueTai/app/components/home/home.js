import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  InteractionManager
} from 'react-native'

import Loop from './loop'
import SelectButton from './selectButton'
import * as HomeAction from '../../actions/homeAction'

const {width,height} = Dimensions.get('window')

class Home extends Component {

  constructor(props) {
    super(props)
    this.state ={
      text: '输入艺人、MV或者悦单名称'
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchHomeIfNeeded()
    })
  }

  render() {
    var data = this.props.data
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.topView}>
          <View style={styles.historyButton}>
            <Image source={require('../../img/search.png')} style={styles.search_icon} />
            <TextInput style={styles.search_text}
                       numberOfLines={1}
                       placeholder={this.state.text}
                       clearButtonMode='while-editing'
            />
          </View>
          <Image source={require('../../img/history.png')} style={styles.history} />
        </View>
        <View style={styles.loop}>
          <Loop data={data.loop} />
        </View>
        <SelectButton data={data.button} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    width: width,
    height: height - 64 - 49,
    backgroundColor:'gray'
  },
  loop: {
    height: 210
  },
  history: {
    width: 32,
    height: 32,
    marginTop: 23,
    marginLeft: 32
  },
  topView: {
    width:width,
    height: 64,
    flexDirection:'row',
    backgroundColor:'black'
  },
  historyButton: {
    height: 32,
    marginTop: 23,
    marginLeft: 10,
    borderRadius: 16,
    width:width / 4 * 3,
    flexDirection:'row',
    backgroundColor:'#ffffff'
  },
  search_icon: {
    width: 25,
    height: 25,
    marginTop: 4,
    marginLeft: 4
  },
  search_text: {
    fontSize: 12,
    color: 'gray',
    width: width / 4 * 3 - 30,
    height: 35

  }
})

export default connect(state => ({
  data: state.HomeReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(HomeAction, dispatch)
  })
)(Home)
