import React from 'react'
import Radium from 'radium'

import { connect } from 'react-redux'

import { updateAnswer, pickState } from './state'

import Textarea from './Textarea'

import { columns, column, bgHighlight} from './styles'

const actionStyle = {
  fontStyle: 'italic'
}

const Answer = connect(
  pickState('example', 'answers'),
  {updateAnswer}
)(({id, example, answers, children, updateAnswer}) =>
  <div>
    <h3>Упражнение</h3>
    {children}
    Ваш пример<br />
    {example}
    <Textarea
      onChange={e => updateAnswer(id, e.target.value)}
      value={answers.get(id)}
    />
  </div>
)

export default Radium((props) =>
  <div>
    <h2>{props.title}</h2>
    <p style={actionStyle}>
      {props.action}
    </p>
    <div style={columns}>
      <div style={column}>
        {props.instruction}
      </div>
      <div style={column}>
        {props.example}
      </div>
    </div>
    <Answer id={props.id} />
  </div>
)
