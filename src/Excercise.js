import React from 'react'
import Radium from 'radium'

import { connect } from 'react-redux'

import Textarea from './Textarea'

const actionStyle = {
  fontStyle: 'italic'
}

const Answer = connect(({example}) => ({example}))(({example, children}) =>
  <div>
    <h3>Упражнение</h3>
    {children}
    Ваш пример<br />
    {example}
    <Textarea />
  </div>
)
export default Radium((props) =>
  <div>
    <h2>{props.title}</h2>
    <p style={actionStyle}>
      {props.action}
    </p>
    {props.explanation}
    <Answer>{props.instruction}</Answer>
  </div>
)
