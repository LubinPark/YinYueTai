import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

class Loading extends Component {

  render() {

    let size = this.props.size ? this.props.size : 50
    let thickness = this.props.thickness ? this.props.thickness : 5

    return (
        <CircularProgress
          size={this.props.size}
          thickness={this.props.thickness} />
    )
  }

}

export default Loading
