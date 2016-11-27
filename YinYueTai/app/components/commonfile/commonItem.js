import React,{Component} from 'react'
import _ from 'underscore'
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

var Device = require('../../utils/device')
var {itemWidth,width,height,black,gray,green,alpha0,imageWidth} = Device

export default class CommonItem extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      mostWatch: this.props.mostWatch,
      mostWatch_item: this.props.mostWatch_item
    }
  }

  render () {

    var data = this.state.data

    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {

      var mostWatch = this.state.mostWatch
      var mostWatch_item = this.state.mostWatch_item

      var titleWhitestyle
      var backgroundColor
      var items

      //判断，改变背景和标题颜色
      if (mostWatch === 1) {
        backgroundColor = {backgroundColor: alpha0},
        titleWhitestyle  = {color: '#ffffff'}
      } else {
        backgroundColor = {backgroundColor: '#ffffff'}
      }

      //判断更改item的宽度
      if (mostWatch_item ===1) {
        items = {
          width:itemWidth + 15,
          marginRight: 10,
          marginBottom: 10,
        }
      }

      return (
          <View style={[styles.items,backgroundColor,items]}>
            <TouchableOpacity onPress={()=>this._goToPlayer(data.videoId)}>
              <Image source={{uri: data.posterPic}} style={styles.img} />
              <View style={styles.info}>
                <Text style={[styles.title,titleWhitestyle]} numberOfLines={1}>{data.title}</Text>
                {this._showName(data)}
                <Text style={styles.num}>播放数量:{data.totalView}</Text>
              </View>
            </TouchableOpacity>
          </View>
      )
    }
  }

  _showName(data) {
    let name = ''
    _.map(data.artists,(item, index) => {
      var tempName = item.artistName
      name = name + tempName
    })

    return(
      <View style={{flexDirection:'row'}}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <View style={styles.moreView}>
        {this._showMoreBtn()}
        </View>
      </View>
    )
  }

  _showMoreBtn() {
    if (this.props.mostWatch == 1) {
      return (
        <Text style={styles.more}>° ° °</Text>
      )
    }
  }

  _goToPlayer(videoId){
    this.context.app.navigator.push({
      id:'PlayerMV',
      data: {
        videoId: videoId
      }
    })
  }

}

const styles = StyleSheet.create({
  items: {
    width:itemWidth,
    marginRight: 10,
    marginBottom: 10,
  },
  img: {
    height:imageWidth,
    borderRadius: 4,
    marginBottom: 10
  },
  info: {
    marginLeft: 10
  },
  title:{
    fontSize: 12,
    marginBottom: 5,
    color: black,
  },
  name: {
    width: itemWidth * 0.75,
    fontSize: 11,
    color: green,
    marginBottom: 5,
  },
  num: {
    fontSize:10,
    marginBottom: 5,
    color: gray
  },
  moreView: {
    alignItems:'flex-end'
  },
  more: {
    color: gray
  }
})
