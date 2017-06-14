import _ from 'underscore'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

import styles from '../../css/home/regionSection.css'

class RegionSection extends Component {

  render() {

    let data = this.props.data

    return (
      <div className='commonItem'>
        <div className='commonItemTitle'>
          <div className='commonItemTitleLeft'></div>
          <div className='commonItemTitleValue'>{this.props.title}</div>
        </div>
        <div className='regionItem'>
        {this._commonItem(data)}
        </div>
      </div>
    )
  }

  _commonItem (data) {
    return (
      _.map(data, (item, index) => {
        return (
          <div style={{marginRight:12}} key={item.id+item.cid}>
            <RegionItem data={item}/>
          </div>
        )
      })
    )
  }

}

class RegionItem extends Component {

  render () {

    let data = this.props.data.attributes
    let url = {
      pathname: '/dealList',
      search: '?title:' + data.name,
      state: { data: data }
    }

    return (
      <Link to={url} style={{textDecoration: `blink`}}>
        <div className='regionItemView'>
          <img className='regionItemViewImg' src={data.cdn_url}/>
          <div className='regionItemViewLocation'>{'# '+data.name}</div>
          <div className='regionItemViewTotal'>{data.count + ' ' +'条买卖'}</div>
        </div>
      </Link>
    )
  }

}

export default RegionSection
