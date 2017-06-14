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
          let url = `/detailDeal?dealId:` + data.deal.id
          return (
            <div key={item.id}>
              <Link to={url} style={{textDecoration: `blink`}}>
                <img src={img} style={imgStyle}/>
              </Link>
            </div>
          )
        })
      }
      </ReactSwipe>
    )
  }

}

export default TopBanner
