import _ from 'underscore'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

import styles from '../../css/home/commonItem.css'

class CommonItem extends Component {

  render() {

    let data = this.props.data.data

    return (
      <div className='commonItem'>
        <div className='commonItemTitle'>
          <div className='commonItemTitleLeft'></div>
          <div className='commonItemTitleValue'>{this.props.title}</div>
        </div>
        <div className='commonItemView'>
        {this._commonItem(data)}
        </div>
      </div>
    )
  }

  _commonItem (data) {
    return (
      _.map(data, (item, index) => {
        return (
          <Item key={item.id+item.cid} data={item}/>
        )
      })
    )
  }

}

class Item extends Component {

  render () {

    let data = this.props.data.attributes
    let url = {
      pathname: '/dealList',
      search: '?params:',
      state: { data: data }
    }

    return (
      <Link to={url} style={{textDecoration: `blink`}}>
        <div className='commonItemSectionView'
             style={{width: (window.innerWidth - 12 * 3) / 2}}>
          <img className='commonItemSectionImg' src={data.cdn_url} />
          <div className='commonItemSectionName'>{data.name}</div>
          <div className='commonItemSectionName'>{data.name_en}</div>
        </div>
      </Link>
    )
  }

}

export default CommonItem
