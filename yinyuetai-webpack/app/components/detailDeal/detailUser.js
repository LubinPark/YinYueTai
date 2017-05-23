import React, { Component } from 'react'

import styles from '../../css/detailDeal/detailUser.css'

class DetailUser extends Component {

  render() {
    return (
      <div className='detailDealView'>
        <div className='detailDealTitle'>发布人信息</div>
        <div className='detailUser'>
          <img className='detailUserImg' src='../../img/userhead.png'/>
          <div className='detailUserName'>芦彬</div>
        </div>
        <div className='detailUserInfo'>
          <DetailUserView value='悉尼'/>
          <DetailUserView value='店主'/>
          <DetailUserView value='营养保健，进口食品'/>
        </div>
      </div>
    )
  }
}

class DetailUserView extends Component {
  render () {
    return (
      <div className='detailUserView'>
        <img className='detailUserIcon' src='../../img/userhead.png'/>
        <div className='detailUserTitle'>{this.props.value}</div>
      </div>
    )
  }
}

export default DetailUser
