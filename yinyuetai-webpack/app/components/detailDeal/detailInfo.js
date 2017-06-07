import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import Func from '../../unit'
import styles from '../../css/detailDeal/detailInfo.css'

class DetailInfo extends Component {

  render() {

    let title = `订单信息`
    let deal = this.props.deal.attributes
    let createdAt = this.props.deal.createdAt
    let hasAddress = (deal.address && deal.address.length > 0)
    let addressText = hasAddress ? deal.address : `(未填写)`
    let dealType = deal.dealType

    return (
      <div className='detailDealView'>
        <div className='detailDealTitle'>{title}</div>
        <div className='detailDealCell'>
          <DetailInfoCell title='买卖城市' pic='locationImg' value={deal.location}/>
          <DetailInfoCell title='备货时间' pic='timeImg' value={deal.prepare_time}/>
        </div>
        {(dealType === `卖`) &&
          <div className='detailDealCell'>
            <DetailInfoCell title='交货方式' pic='cartImg' value={Func.arrayToString(deal.delivery)}/>
            <DetailInfoCell title='详细地址' pic='addressImg' value={addressText}/>
          </div>}
        <div className='detailDealCell' style={{paddingBottom: 15}}>
          <DetailInfoCell title='发布时间' pic='timeImg' value={Func.parseTime(createdAt)}/>
          <DetailInfoCell title='有效期至' pic='validiconImg' value={Func.parseValidTime(deal.validDate)}/>
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
    let iconStyle = 'dealInfoImg' + ' ' + this.props.pic
    return (
      <div className='detailInfoCell'>
        <div className={iconStyle}/>
        <div className='dealInfoTitle'>{this.props.title}:</div>
        <div className='dealInfoValue' style={{width: this.state.width - 150}}>{this.props.value}</div>
      </div>
    )
  }
}

export default DetailInfo
