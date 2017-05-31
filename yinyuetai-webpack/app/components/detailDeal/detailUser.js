import React, { Component } from 'react'

import Func from '../../unit'
import styles from '../../css/detailDeal/detailUser.css'

class DetailUser extends Component {

  render() {

    let deal = this.props.deal.attributes
    let user = deal.user.attributes
    let img = user.picture ? user.picture.attributes.url : '../../img/userhead.png'

    return (
      <div className='detailDealView'>
        <div className='detailDealTitle'>发布人信息</div>
        <div className='detailUser'>
          <img className='detailUserImg' src={img}/>
          <div className='detailUserName'>{user.name}</div>
          <img className='detailUserValidImg' src='../../img/valid.png'/>
        </div>
        <div className='detailUserInfo'>
          <DetailUserView pic='location' value={user.location} />
          <DetailUserView pic='occupation' value={user.occupation} />
          <DetailUserView pic='speciality' value={Func.arrayToString(user.category)}/>
        </div>
      </div>
    )
  }
}

class DetailUserView extends Component {
  render () {
    let img = '../../img/'+ this.props.pic +'.png'
    return (
      <div className='detailUserView'>
        <img className='detailUserIcon' src={img} />
        <div className='detailUserTitle'>{this.props.value}</div>
      </div>
    )
  }
}

export default DetailUser
