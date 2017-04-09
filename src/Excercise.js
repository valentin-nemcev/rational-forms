import React from 'react'
import Radium from 'radium'

const actionStyle = {
  fontStyle: 'italic'
}

export default Radium((props) =>
  <div>
    <h2>{props.title}</h2>
    <p style={actionStyle}>
      {props.action}
    </p>
    {props.children}
  </div>
)
