import React, { Component } from 'react'

import Home from '../components/home/home'
import styles from '../css/common/root.css'

class App extends Component {
  render() {
    return (
      <div className='root'>
        <Home />
      </div>
    )
  }
}

export default App
