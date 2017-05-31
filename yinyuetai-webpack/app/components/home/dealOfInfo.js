import React, { Component } from 'react'

import Func from '../../unit'
import styles from '../../css/home/dealOfInfo.css'

class DealOfInfo extends Component{

  constructor(props) {
    super(props)
    this.state = {
      width: ((window.innerWidth) / 2.5)
    }
  }

  render() {

    let deal = this.props.deal.attributes
    if (deal.dealType === '卖') {
      return (
        <div style={{height: 50}}>
          <div style={{'display': 'flex'}}>
            <div style={{width: this.state.width}}>
              <CommonInfoView pic='location' title='发货地点' value={deal.location}/>
            </div>
            <CommonInfoView pic='time' title='备货时间' value={deal.prepare_time}/>
          </div>
          <CommonInfoView pic='cart' title='交货方式' value={Func.arrayToString(deal.delivery)}/>
        </div>
      )
    } else {
      return (
        <div className='commonInfoView'>
          <div style={{width: this.state.width}}>
            <CommonInfoView pic='location' title='收货地点' value={deal.location}/>
          </div>
          <CommonInfoView pic='time' title='备货时间' value={deal.prepare_time}/>
        </div>
      )
    }
  }
}

class CommonInfoView extends Component {
  render() {
    let img = '../../img/'+ this.props.pic +'.png'
    return (
      <div className='dealInfo'>
        <img className='dealOfImg' src={img} />
        <div className='location'>{this.props.title}: </div>
        <div className='locationValue'>{this.props.value}</div>
      </div>
    )
  }
}

export default  DealOfInfo
