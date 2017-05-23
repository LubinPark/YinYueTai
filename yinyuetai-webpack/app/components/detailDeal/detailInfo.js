import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import styles from '../../css/detailDeal/detailInfo.css'

class DetailInfo extends Component {

  render() {
    return (
      <div className='detailDealView'>
        <div className='detailDealTitle'>订单信息</div>
        <div className='detailDealCell'>
          <DetailInfoCell title='买卖城市' value='悉尼'/>
          <DetailInfoCell title='备货时间' value='不定'/>
        </div>
        <div className='detailDealCell'>
          <DetailInfoCell title='交货方式' value='跨境配送'/>
          <DetailInfoCell title='详细地址' value='(未填写)'/>
        </div>
        <div className='detailDealCell' style={{paddingBottom: 15}}>
          <DetailInfoCell title='发布时间' value='2017/2/16'/>
          <DetailInfoCell title='有效期至' value='长期有效'/>
        </div>
      </div>
    )
  }

}

class DetailInfoCell extends Component {

  constructor(props) {
    super(props)
    this.state = {
      width: (window.innerWidth)
    }
  }

  render() {
    return (
      <div className='detailInfoCell'>
        <img className='dealInfoImg' src='../../img/userhead.png'/>
        <div className='dealInfoTitle'>{this.props.title}:</div>
        <div className='dealInfoValue' style={{width: this.state.width - 150}}>{this.props.value}</div>
        <div></div>
      </div>
    )
  }
}

export default DetailInfo
