import React, { Component } from 'react'
import Radium from 'radium'

const actionStyle = {
  fontStyle: 'italic'
}

class Excercise extends Component {
  render () {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p style={actionStyle}>
          {this.props.action}
        </p>
        {this.props.children}
      </div>
    )
  }
}

export default Radium(Excercise)
