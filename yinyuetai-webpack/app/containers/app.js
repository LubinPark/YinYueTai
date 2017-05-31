import React, {Component} from 'react'

import Home from '../components/home/home'
import styles from '../css/home/home.css'

class App extends Component{
  render() {
    return (
      <div className={styles.root}>
        <Home />
      </div>
    )
  }
}

export default App
