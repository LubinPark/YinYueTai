import {Dimensions} from 'react-native'

const {width,height} = Dimensions.get('window')
const itemHeight = 0

//首页每个模块的item按照比例不同在不同机型比例有差，单独赋值
if (width == 320) {
   var widthOS = 140
   itemHeight = widthOS
} else if (width == 375) {
  var widthOS = 155
  itemHeight = widthOS
}

module.exports = {
  width:width,
  height:height,
  itemHeight: itemHeight,
  imageWidth: (width - 30 ) / 2 * 0.58,
  itemWidth: ((width - 10) - 20 ) / 2,

  black: '#525252',
  gray: '#A8A8A8',
  green: '#00CD66',
  alpha0:'rgba(0,0,0,0)',
  lightGray: '#E8E8E8'
}
