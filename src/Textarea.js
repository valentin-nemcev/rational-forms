import { createElement as e } from 'react'
import Radium from 'radium'

import Textarea from 'react-autosize-textarea'

const style = {
  width: '100%',
  resize: 'none'
}

export default Radium((props) => e(Textarea, {style, rows: 2, ...props}))
