import React, { Component } from 'react'

import styles from '../../css/home/dealOfUserInfo.css'

class DealOfUserInfo extends Component{
  render() {
    return (
      <div className='dealUser'>
        <img className='userheadImg' alt='userhead' src='../../img/userhead.png'/>
        <div className='userinfo'>
          <div className='nameAndImg'>
            <div className='username'>姓名</div>
            <img className='validImage' src='../../img/userhead.png' alt='valid'/>
          </div>
          <div className='occupation'>代购</div>
        </div>
        <div className='type'>出</div>
      </div>
    )
  }
}

export default  DealOfUserInfo
