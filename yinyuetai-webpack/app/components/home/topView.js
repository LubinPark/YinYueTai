import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from '../../css/home/topView.css'
import Func from '../../unit'

class TopView extends Component {

  render() {

    let searchText = this.props.searchText ? this.props.searchText : false
    let url = {
      pathname: '/search',
      state: { page: `home` }
    }

    return (
      <div className='topView'>
        <div className='topViewLogoIcon'>
          <div className='topViewLogo' />
        </div>
        <div className='topViewTitle'>买卖派</div>
        <Link to={url} style={{textDecoration: `blink`}}>
          <div className='searchView'>
            <div className='searchViewImg' />
            {
              searchText &&
              <div className='searchViewText' style={{width: window.innerWidth - 170}}>
              {Func.arrayToStringWithSymbol(searchText, `|`)}
              </div>
            }
            {
              !searchText &&
              <div className='searchViewText' style={{width: window.innerWidth - 170}}>
              搜索
              </div>
            }
          </div>
        </Link>
      </div>
    )
  }

}

export default TopView
