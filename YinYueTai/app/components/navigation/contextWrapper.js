import React, {Component} from 'react'

export default class ContextWrapper extends Component {

  static childContextTypes = {
    page: React.PropTypes.object
  }

  getChildContext() {
    return {page: this.props.context}
  }

  render() {
    return this.props.children
  }
}
