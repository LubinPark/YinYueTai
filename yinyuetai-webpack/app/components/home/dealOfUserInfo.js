import React, { Component } from 'react'

import styles from '../../css/home/dealOfUserInfo.css'

class DealOfUserInfo extends Component{

  render() {

    let deal = this.props.deal.attributes
    let user = deal.user.attributes
    let verification = user.Verification > 0
    let pic = user.picture ? user.picture.attributes.url : '../../img/userhead.png'

    let type = ''
    let color = ''

    if (deal.dealType === '买') {
      type = '收',
      color = '#ffd149'
    } else {
      type = '出',
      color = '#73e2ff'
    }

    return (
      <div className='dealUser' style={{'backgroundColor':color}}>
        <img className='userheadImg' alt='userhead' src={pic}/>
        <div className='userinfo'>
          <div className='nameAndImg'>
            <div className='username'>{user.name}</div>
            { verification && <img className='validImage' src='../../img/valid.png' alt='valid'/> }
          </div>
          <div className='occupation'>{user.occupation}</div>
        </div>
        <div className='type'>{type}</div>
      </div>
    )
  }
}

export default  DealOfUserInfo
