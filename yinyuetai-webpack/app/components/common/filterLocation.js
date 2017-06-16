import _ from 'underscore'
import React, { Component } from 'react'

import styles from '../../css/common/filterLocation.css'

class FilterLocation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectLocation: `不限`
    }
  }

  render() {

    let locations = this.props.locations
    let selectLocation = this.props.selectLocation ? this.props.selectLocation : this.state.selectLocation

    return (
      <div className='filterLocationView'>
      {
        _.map(locations, (items, index) => {
          return (
            <div style={{width:window.innerWidth}} key={items.name}>
              <div className='filterLocationTitle'>{items.name}</div>
              <div className='rowView'>
              {
                _.map(items.locations, (item, index)=> {
                  if (item === selectLocation) {
                    return (
                      <div className='filterLocationValueSelectView' key={item+index} onClick={()=>this._onClick(item)}>
                        <div className='filterLocationSelectValue' style={{width: (window.innerWidth - 60) / 3}}>{item}</div>
                      </div>
                    )
                  } else {
                    return (
                      <div className='filterLocationValueView' key={item+index} onClick={()=>this._onClick(item)}>
                        <div className='filterLocationValue' style={{width: (window.innerWidth - 60) / 3}}>{item}</div>
                      </div>
                    )
                  }
                })
              }
              </div>
            </div>
          )
        })
      }
      </div>
    )
  }

  _onClick(selectLocation) {
    this.setState({
      selectLocation: selectLocation
    },() => {
      this.props.onClick && this.props.onClick(selectLocation)
    })
  }

}

export default FilterLocation
