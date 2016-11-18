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
var {width,height,black,gray,green,imageWidth} = Device

export default class CommonItem extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  };

  render () {
    var data = this.props.data
    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {
      return (
          <View style={styles.item}>
            <TouchableOpacity onPress={()=>this._goToPlayer()}>
              <Image source={{uri: data.posterPic}} style={styles.img} />
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                {this._showName(data)}
                <Text style={styles.num}>播放数量:{data.totalView}</Text>
              </View>
            </TouchableOpacity>
          </View>
      )
    }
  }

  _showName(data){
    let name = ''
    _.map(data.artists,(item, index) => {
      var tempName = item.artistName
      name = name + tempName
    })
    return(
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
    )
  }

  _goToPlayer(){
    this.context.app.navigator.push({
      id:'PlayerMV'
    })
  }

}

const styles = StyleSheet.create({
  item: {
    width:((width - 10) - 20 ) / 2,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor:'#ffffff'
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
    color: black
  },
  name: {
    fontSize: 11,
    color: green,
    marginBottom: 5,
  },
  num: {
    fontSize:10,
    color: gray
  }
})
