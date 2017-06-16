import _ from 'underscore'
import React, { Component } from 'react'

import styles from '../../css/common/filterBox.css'

class FilterOfRadioBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectItem: this.props.selectItem
    }
  }

  render() {

    let itemArray = this.props.itemArray
    let selectItem = this.props.selectItem.toString()

    return (
      <div className='filterBoxView'>
        <div className='filterBoxTitle'>{this.props.title}</div>
        <div className='rowView'>
        {
          _.map(itemArray, (item, index)=> {
            if (this.state.selectItem === item) {
              return (
                <div className='filterLocationValueSelectView'
                     key={item+index} onClick={()=>this._onClick(item)}>
                  <div className='filterLocationSelectValue' style={{width: (window.innerWidth - 60) / 3}}>
                    {item}
                  </div>
                </div>
              )
            } else {
              return (
                <div className='filterLocationValueView'
                      key={item+index} onClick={()=>this._onClick(item)}>
                  <div className='filterLocationValue' style={{width: (window.innerWidth - 60) / 3}}>
                    {item}
                  </div>
                </div>
              )
            }
          })
        }
        </div>
      </div>
    )
  }

  _onClick(selectItem) {
    if (this.state.selectItem === selectItem) {
      this.setState({
        selectItem: ``
      }, () => {
        this.props.onPress && this.props.onPress(``)
      })
    } else {
      this.setState({
        selectItem: selectItem
      }, () => {
        this.props.onPress && this.props.onPress(selectItem)
      })
    }
  }

}

export default FilterOfRadioBox
