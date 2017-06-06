import React, { Component } from 'react'

import Func from '../../unit'
import styles from '../../css/detailDeal/detailUser.css'

class DetailUser extends Component {

  render() {

    let title = `发布人信息`
    let deal = this.props.deal.attributes
    let user = deal.user.attributes
    let verification = user.Verification > 0
    let img = user.picture ? user.picture.attributes.url : false

    return (
      <div className='detailDealView'>
        <div className='detailDealTitle'>{title}</div>
        <div className='detailUser'>
        { img ? <img className='detailUserImg' src={img}/>
              : <img className='detailUserImgLocal' /> }
          <div className='detailUserName'>{user.name}</div>
          { verification && <img className='detailUserValidImg'/> }
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
    let img = './img/'+ this.props.pic +'.png'
    return (
      <div className='detailUserView'>
        <img className='detailUserIcon' src={img} />
        <div className='detailUserTitle'>{this.props.value}</div>
      </div>
    )
  }
}

export default DetailUser
