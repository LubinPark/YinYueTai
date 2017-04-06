import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const itemHeight = 0

//首页每个模块的item按照比例不同在不同机型比例有差，单独赋值
if (width == 320) {
   var widthOS = 146
   itemHeight = widthOS
} else if (width == 375) {
  var widthOS = 162
  itemHeight = widthOS
}

module.exports = {
  width:width,
  height:height,
  itemHeight: itemHeight,
  imageWidth: (width - 30 ) / 2 * 0.58,
  itemWidth: ((width - 10) - 20 ) / 2,

  black: '#525252',
  gray: 'rgb(182,182,182)',
  green: 'rgb(44,179,147)',
  alpha0:'rgba(0,0,0,0)',
  lightGray: '#E8E8E8',
  purpure: 'rgb(59,46,69)',
  darkGreen: 'rgb(8,39,51)'

}
