import React, { Component } from 'react'

import styles from '../../css/dealOfInfo.css'

class DealOfInfo extends Component{

  render() {
    return (
      <div className='dealInfo'>
        <tr className='view'>
          <th>
            <img src='../../img/userhead.png' alt='picture' className='dealOfImg'/>
          </th>
          <th>
            <p className='location'>发货地点:</p>
          </th>
          <th>
            <p className='locationValue'>悉尼</p>
          </th>
        </tr>
      </div>
    )
  }

}

export default  DealOfInfo
