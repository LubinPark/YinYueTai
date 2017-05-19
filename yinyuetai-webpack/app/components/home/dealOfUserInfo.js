import React, { Component } from 'react'

import styles from '../../css/dealOfUserInfo.css'

class DealOfUserInfo extends Component{

  render() {
    return (
      <div className='dealUser'>
        <img src='../../img/userhead.png' alt='picture'
             className='userheadImg'/>
        <div className='userinfo'>
          <td className='username' >姓名</td>
          <td className='occupation'>代购</td>
          <td className='occupation'>测试</td>
        </div>
      </div>
    )
  }

}

export default  DealOfUserInfo
