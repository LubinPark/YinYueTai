import _ from 'underscore'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/homeAction'
import TopView from './topView'
import TopBanner from './topBanner'
import DealInfoText from './dealInfoText'
import Loading from '../common/loading'
import RegionSection from './regionSection'
import CommonItem from './commonItem'

class Home extends Component {

  componentWillMount() {
    this.props.actions.fetchHomeIfNeeded({type: `getHomePage`})
    this.props.actions.fetchHomeIfNeeded({type: `getHotSearches`})
  }

  render() {

    let data = this.props.data.home

    if (!_.isEmpty(data)) {
      return (
        <div style={{backgroundColor:'#ededed',marginTop:44}}>
          <TopView searchText={this.props.data.searches}/>
          <TopBanner topBanner={data.topBanners} />
          <DealInfoText data={data.recentDeals} />
          <RegionSection title={data.locations.title} data={data.locations.data} />
          {
            _.map(data.sections, (item, index) => {
              return (
                <CommonItem title={item.title} data={item} key={item.title} />
              )
            })
          }
        </div>
      )
    } else {
      return (
        <div className='center' style={{height: window.innerHeight}}>
          <TopView />
          <Loading />
        </div>
      )
    }
  }
}

export default connect(state => ({
  data: state.HomeReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Home)
