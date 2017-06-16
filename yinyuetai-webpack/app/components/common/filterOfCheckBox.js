import _ from 'underscore'
import React, { Component } from 'react'

import styles from '../../css/common/filterBox.css'

class FilterOfCheckBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectItems: this.props.selectItems
    }
  }

  render() {

    let itemArray = this.props.itemArray

    return (
      <div className='filterBoxView'>
        <div className='filterBoxTitle'>{this.props.title}</div>
        <div className='rowView'>
        {
          _.map(itemArray, (item, index)=> {
            if (_.contains(this.state.selectItems, item)) {
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
  }

  _onClick(item) {
    if (_.contains(this.state.selectItems, item)) {
      var selectItems = this.state.selectItems
      var selectItemsNew = []
      for (var i = 0; i < selectItems.length; i++) {
        if (selectItems[i] === item) {
          // delete item
        } else {
          selectItemsNew.push(selectItems[i])
        }
        this.setState({
          selectItems: selectItemsNew
        },() => {
          this.props.onPress && this.props.onPress(this.state.selectItems)
        })
      }
    } else {
      var selectItems = this.state.selectItems
      var selectItemsNew = []
      for (var i = 0; i < selectItems.length; i++) {
        selectItemsNew.push(selectItems[i])
      }
      selectItemsNew.push(item)
      this.setState({
        selectItems: selectItemsNew
      },() => {
        this.props.onPress && this.props.onPress(this.state.selectItems)
      })
    }
  }

}

export default FilterOfCheckBox
