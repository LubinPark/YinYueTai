import React, { Component } from 'react'

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

      let delivery = ''
      for (var i = 0; i < deal.delivery.length; i++) {
        delivery += ' '+deal.delivery[i]
      }
      return (
        <div style={{height: 50}}>
          <div style={{'display': 'flex'}}>
            <div style={{width: this.state.width}}>
              <CommonInfoView pic='../../img/userhead.png' title='发货地点' value={deal.location}/>
            </div>
            <CommonInfoView pic='../../img/userhead.png' title='备货时间' value={deal.prepare_time}/>
          </div>
          <CommonInfoView pic='../../img/userhead.png' title='交货方式' value={delivery}/>
        </div>
      )
    } else {
      return (
        <div className='commonInfoView'>
          <div style={{width: this.state.width}}>
            <CommonInfoView pic='../../img/userhead.png' title='收货地点' value={deal.location}/>
          </div>
          <CommonInfoView pic='../../img/userhead.png' title='备货时间' value={deal.prepare_time}/>
        </div>
      )
    }
  }
}

class CommonInfoView extends Component {
  render() {
    return (
      <div className='dealInfo'>
        <img className='dealOfImg' src={this.props.pic} alt='picture' />
        <div className='location'>{this.props.title}: </div>
        <div className='locationValue'>{this.props.value}</div>
      </div>
    )
  }
}

export default  DealOfInfo
