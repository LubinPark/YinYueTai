import React, { Component } from 'react'

import styles from '../../css/home/topView.css'

class TopView extends Component {

  render() {

    let searchText = this.props.searchText ? this.props.searchText : '搜索'

    return (
      <div className='topView'>
        <div className='topViewLogoIcon'>
          <div className='topViewLogo' />
        </div>
        <div className='topViewTitle'>买卖派</div>
        <div className='searchView'>
          <div className='searchViewImg' />
          <div className='searchViewText' style={{width: window.innerWidth - 170}}>{searchText}</div>
        </div>
      </div>
    )
  }

}

export default TopView
