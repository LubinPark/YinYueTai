import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import Func from '../../unit'
import styles from '../../css/detailDeal/detailInfo.css'

class DetailInfo extends Component {

  render() {

    let deal = this.props.deal.attributes
    let createdAt = this.props.deal.createdAt
    let hasAddress = (deal.address && deal.address.length > 0)
    let addressText = hasAddress ? deal.address : `(未填写)`
    let dealType = deal.dealType

    return (
      <div className='detailDealView'>
        <div className='detailDealTitle'>订单信息</div>
        <div className='detailDealCell'>
          <DetailInfoCell title='买卖城市' pic='location' value={deal.location}/>
          <DetailInfoCell title='备货时间' pic='time' value={deal.prepare_time}/>
        </div>
        {(dealType === `卖`) &&
          <div className='detailDealCell'>
            <DetailInfoCell title='交货方式' pic='cart' value={Func.arrayToString(deal.delivery)}/>
            <DetailInfoCell title='详细地址' pic='address' value={addressText}/>
          </div>}
        <div className='detailDealCell' style={{paddingBottom: 15}}>
          <DetailInfoCell title='发布时间' pic='time' value={Func.parseTime(createdAt)}/>
          <DetailInfoCell title='有效期至' pic='validicon' value={Func.parseValidTime(deal.validDate)}/>
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
    let img = './img/'+ this.props.pic +'.png'
    return (
      <div className='detailInfoCell'>
        <img className='dealInfoImg' src={img} />
        <div className='dealInfoTitle'>{this.props.title}:</div>
        <div className='dealInfoValue' style={{width: this.state.width - 150}}>{this.props.value}</div>
      </div>
    )
  }
}

export default DetailInfo
