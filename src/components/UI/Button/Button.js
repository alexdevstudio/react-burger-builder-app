import React from 'react'
import classes from './Button.module.css'

const button = props => {
  let btnClass = classes.Success;
  if( props.btnType === 'Danger')
  btnClass = classes.Danger;
  return (
    <button
      className={[classes.Button, btnClass].join(' ')}
      onClick={props.clicked}>{props.children}</button>
  )
}

export default button
