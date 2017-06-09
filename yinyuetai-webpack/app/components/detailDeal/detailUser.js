import React, { Component } from 'react'

import Func from '../../unit'
import styles from '../../css/detailDeal/detailUser.css'
import { orgionUrl, cdnUrl } from '../../containers/imgUrl'

class DetailUser extends Component {

  render() {

    let title = `发布人信息`
    let user = this.props.user.attributes
    let verification = user.Verification > 0
    let img = user.picture ? user.picture.attributes.url.replace(orgionUrl, cdnUrl) : false

    return (
      <div className='detailDealView'>
        <div className='detailDealTitle'>{title}</div>
        <div className='detailUser'>
        { img ? <img className='detailUserImg' src={img}/>
              : <div className='detailUserImgLocal' /> }
          <div className='detailUserName'>{user.name}</div>
          { verification && <div className='detailUserValidImg'/> }
        </div>
        <div className='detailUserInfo'>
          <DetailUserView pic='locationImg' value={user.location} />
          <DetailUserView pic='occupationImg' value={user.occupation} />
          <DetailUserView pic='specialityImg' value={Func.arrayToString(user.category)}/>
        </div>
      </div>
    )
  }
}

class DetailUserView extends Component {
  render () {
    let iconStyle = 'detailUserIcon' + ' ' + this.props.pic
    return (
      <div className='detailUserView'>
        <div className={iconStyle} />
        <div className='detailUserTitle'>{this.props.value}</div>
      </div>
    )
  }
}

export default DetailUser
