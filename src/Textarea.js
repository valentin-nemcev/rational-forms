import React from 'react'
import Radium from 'radium'

import Textarea from 'react-autosize-textarea'

const style = {
  width: '100%',
  resize: 'none'
}

export default Radium(function textarea (props) {
  return <Textarea style={style} rows={2} {...props} />
})
