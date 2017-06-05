import React, { Component } from 'react'

import styles from '../../css/detailDeal/detailInfo.css'

class DetailSupply extends Component {

  render() {

    let brief = this.props.deal.attributes.brief
    let briefText = (brief && brief.length >0) ? brief : `暂无`
    let title = `补充说明`

    return (
      <div className='detailDealView'>
        <div className='detailDealTitle'>{title}</div>
        <div className='detailDealSupply'>{briefText}</div>
      </div>
    )
  }

}

export default DetailSupply
