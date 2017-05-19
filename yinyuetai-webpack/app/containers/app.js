import React, {Component} from 'react'

import Home from '../components/home/home'
import styles from '../css/home.css'

export default class App extends Component{
  render() {
    return (
      <div className={styles.root}>
        <Home />
      </div>
    )
  }
}
