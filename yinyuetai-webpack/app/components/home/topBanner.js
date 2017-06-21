import _ from 'underscore'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import ReactSwipe from 'react-swipe'

import styles from '../../css/home/dealInfoText.css'
import { orgionUrl, cdnUrl } from '../../containers/imgUrl'

const swipeOptions = {
  auto: parseInt(4000),
  speed: parseInt(200),
  disableScroll: true,
  continuous: true,
  callback() {
    // console.log('slide changed')
  },
  transitionEnd() {
    // console.log('ended transition')
  }
}

class TopBanner extends Component {

  render() {

    let topBanner = this.props.topBanner

    return (
      <ReactSwipe swipeOptions={swipeOptions}>
      {
        _.map(topBanner, (item, index) =>{
          let data = item.attributes
          let img = data.image.attributes.url
          let imgStyle = { height: window.innerWidth * 260 / 750 }
          let url

          if (data.type === `deal`) {
            url = `/detailDeal?dealId:` + data.deal.id
          } else if (data.type === `website`) {
            url = data.web_url
          } else if (data.type === `user`) {
            url = `/user?userId:` + data.user.id
          } else if (data.type === `deal_list`) {
            url = {
              pathname: '/dealList',
              search: '?title:' + data.name,
              state: { data: data }
            }
          }

          if(data.type === `deal` || data.type === `user` || data.type === `deal_list`) {
            return (
              <div key={item.id} className='topBannersView'>
                <Link to={url} style={{textDecoration: `blink`}}>
                  <img src={img} style={imgStyle}/>
                </Link>
              </div>
            )
          } else {
            return (
              <div key={item.id}>
                <a href={url}>
                  <img src={img} style={imgStyle}/>
                </a>
              </div>
            )
          }
        })
      }
      </ReactSwipe>
    )
  }

}

export default TopBanner
