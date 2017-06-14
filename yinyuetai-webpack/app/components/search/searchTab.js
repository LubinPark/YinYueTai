import React, { Component } from 'react'
import styles from '../../css/search/searchTab.css'

export default class SearchTab extends Component {

  render() {
    return (
      <div>
        <div className='searchTabInputView'>
          <input className='searchTabInput' style={{width: window.innerWidth - 80}}
                   type='text' defaultValue='' />
          <div className='searchTabText'>搜索</div>
        </div>
        <div className='searchTabInputViewLine' />
      </div>
    )
  }
}
