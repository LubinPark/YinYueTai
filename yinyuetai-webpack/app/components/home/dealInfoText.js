import _ from 'underscore'
import ReactSwipe from 'react-swipe'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

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

class DealInfoText extends Component {

  render() {
    return (
      <ReactSwipe swipeOptions={swipeOptions}>
      {
        _.map(this.props.data, (item, index) => {

          let newItem = item.attributes
          let user = newItem.user
          let dealType = newItem.dealType
          let location = newItem.location
          let typeText = (dealType === `买`) ? `收` : `出`
          let color = (dealType === `买`) ? {color : '#f0b514'} : { color: '#51acf2' }
          let img = user.attributes.picture ? user.attributes.picture.attributes.url.replace(orgionUrl, cdnUrl) : false
          let product = newItem.products[0].attributes
          let product_brand = product.brand
          let name = product.name
          let product_min_quantity = newItem.product_min_quantity
          let verification = item.attributes.user.attributes.Verification > 0
          let url = `/detailDeal?dealId:` + item.id
          let info = ``

          if (dealType ===`买`) { info = product_brand + ` ` +  name + ` ` + product_min_quantity + `件起` }
          else { info = product_brand + ` ` +  name + ` ` + product_min_quantity + `件` }

          return (
            <div key={item.id}>
              <Link to={url} style={{textDecoration: `blink`}}>
                <div className='dealInfoText'>
                { img ? <img className='dealInfoTextImg' src={img}/>
                      : <div className='dealInfoTextImgLocal' /> }
                { verification  &&  <div className='dealInfoTextVerification'></div>}
                <div className='dealInfoTextType' style={color}>[{location}-{typeText}]</div>
                <div className='dealInfoTextName'>{info}</div>
                </div>
              </Link>
            </div>
          )
        })
      }
      </ReactSwipe>
    )
  }

}

export default DealInfoText
