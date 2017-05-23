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
    return (
      <div className='commonInfoView'>
        <div>
          <div style={{width: this.state.width}}>
            <CommonInfoView pic='../../img/userhead.png' title='发货地点' value='悉尼'/>
          </div>
          <CommonInfoView pic='../../img/userhead.png' title='交货方式' value='到店自取'/>
        </div>
        <CommonInfoView pic='../../img/userhead.png' title='备货时间' value='现货'/>
      </div>
    )
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
