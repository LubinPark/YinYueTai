import _ from 'underscore'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

import * as actions from '../../actions/homeAction'
import TopView from './topView'
import Loading from '../common/loading'
import DealInfoText from './dealInfoText'
import CommonItem from './commonItem'
import RegionSection from './regionSection'

class Home extends Component {

  componentWillMount() {
    this.props.actions.fetchHomeIfNeeded({type: `getHomePage`})
  }

  render() {

    let data = this.props.data.home

    if (!_.isEmpty(data)) {
      return (
        <div style={{backgroundColor:'#ededed',marginTop:44}}>
          <TopView searchText='search'/>
          {this._swiper(data.topBanners)}
          <DealInfoText data={data.recentDeals}/>
          <RegionSection title={data.locations.title} data={data.locations.data}/>
          {
            _.map(data.sections, (item, index) => {
              return (
                <CommonItem title={item.title} data={item} key={item.title}/>
              )
            })
          }
        </div>
      )
    } else {
      return (
        <div className='center' style={{height: window.innerHeight}}>
          <Loading />
        </div>
      )
    }
  }

  _swiper(topBanners) {
    return (
      <AutoPlaySwipeableViews direction='incremental' animateHeight={true}>
      {
        _.map(topBanners, (item, index) =>{
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
      </AutoPlaySwipeableViews>
    )
  }

}

export default connect(state => ({
  data: state.HomeReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Home)
