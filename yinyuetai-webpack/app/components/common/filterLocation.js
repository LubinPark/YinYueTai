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
            <div key={items.name}>
              <div className='filterLocationTitle'>{items.name}</div>
              <div>
              {
                _.map(items.locations, (item, index)=> {
                  if (item === selectLocation) {
                    return (
                      <div className='filterLocationValueSelectView' key={item+index}>
                        <div className='filterLocationSelectValue' style={{width: (window.innerWidth - 40) / 3}}>{item}</div>
                      </div>
                    )
                  } else {
                    return (
                      <div className='filterLocationValueView' key={item+index}>
                        <div className='filterLocationValue' style={{width: (window.innerWidth - 40) / 3}}>{item}</div>
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

}

export default FilterLocation
