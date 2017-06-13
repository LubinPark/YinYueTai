import React, { Component } from 'react'

import styles from '../../css/dealList/dealOfUserInfo.css'
import styles2 from '../../css/common/img.css'
import { orgionUrl, cdnUrl } from '../../containers/imgUrl'

class DealOfUserInfo extends Component{

  render() {

    let deal = this.props.deal.attributes
    let user = deal.user.attributes
    let verification = user.Verification > 0
    let pic = user.picture ? user.picture.attributes.url.replace(orgionUrl, cdnUrl) : false
    let type, color = ``

    if (deal.dealType === `买`) {
      type = `收`, color = `#ffd149`
    } else {
      type = `出`, color = `#73e2ff`
    }

    return (
      <div className='dealUser' style={{backgroundColor:color}}>
      { pic ? <img className='userheadImg' src={pic}/>
            : <div className='userheadImgLocal' /> }
        <div className='userinfo'>
          <div className='nameAndImg'>
            <div className='username'>{user.name}</div>
            { verification && <div className='validImage'/> }
          </div>
          <div className='occupation'>{user.occupation}</div>
        </div>
        <div className='type'>{type}</div>
      </div>
    )
  }
}

export default  DealOfUserInfo
