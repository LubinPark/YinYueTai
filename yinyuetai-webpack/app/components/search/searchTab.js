import React, { Component } from 'react'
import styles from '../../css/search/searchTab.css'

export default class SearchTab extends Component {

  render() {

    let searchText = this.props.searchText ? this.props.searchText : ``

    return (
      <div className='searchTabInputView'>
        <input className='searchTabInput'
               type='text'
               style={{width: window.innerWidth - 80}}
               placeholder='search'
               value={this.props.searchText}
               onChange={(e)=>this._onChange(e)}/>
        <div className='searchTabText'>搜索</div>
      </div>
    )
  }

  _onChange(e) {
    let value = e.target.value
    this.props.onChange && this.props.onChange(value)
  }

}
