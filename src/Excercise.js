import React, { Component } from 'react'
import Radium from 'radium'

class Excercise extends Component {
  render () {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </div>
    )
  }
}

export default Radium(Excercise)
