import React, { Component } from 'react'

import Func from '../../unit'
import styles from '../../css/home/dealOfInfo.css'

class DealOfInfo extends Component{

  constructor(props) {
    super(props)
    this.state = {
      width: ((window.innerWidth) / 2)
    }
  }

  render() {

    let deal = this.props.deal.attributes
    if (deal.dealType === `卖`) {
      return (
        <div style={{height: 50}}>
          <div style={{display: `flex`}}>
            <div style={{width: this.state.width}}>
              <CommonInfoView pic='locationImg' title={`发货地点`} value={deal.location}/>
            </div>
            <CommonInfoView pic='timeImg' title={`备货时间`} value={deal.prepare_time}/>
          </div>
          <CommonInfoView pic='cartImg' title={`交货方式`} value={Func.arrayToString(deal.delivery)}/>
        </div>
      )
    } else {
      return (
        <div className='commonInfoView'>
          <div style={{width: this.state.width, height: 25}}>
            <CommonInfoView pic='locationImg' title={`收货地点`} value={deal.location}/>
          </div>
          <CommonInfoView pic='timeImg' title={`备货时间`} value={deal.prepare_time}/>
        </div>
      )
    }
  }
}

class CommonInfoView extends Component {
  render() {
     let iconStyle = 'dealInfoImg' + ' '+ this.props.pic
    return (
      <div className='dealInfo'>
        <div className={iconStyle}/>
        <div className='location'>{this.props.title}: </div>
        <div className='locationValue'>{this.props.value}</div>
      </div>
    )
  }
}

export default  DealOfInfo
