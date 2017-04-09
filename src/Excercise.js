import React from 'react'
import Radium from 'radium'

import { connect } from 'react-redux'

import { updateAnswer, pickState } from './state'

import Textarea from './Textarea'

const actionStyle = {
  fontStyle: 'italic'
}

const Answer = connect(
  pickState('example'),
  {updateAnswer}
)(({id, example, children, updateAnswer}) =>
  <div>
    <h3>Упражнение</h3>
    {children}
    Ваш пример<br />
    {example}
    <Textarea onChange={e => updateAnswer(id, e.target.value)} />
  </div>
)

export default Radium((props) =>
  <div>
    <h2>{props.title}</h2>
    <p style={actionStyle}>
      {props.action}
    </p>
    {props.explanation}
    <Answer id={props.id}>{props.instruction}</Answer>
  </div>
)
