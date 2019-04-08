import React from 'react'

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'MeAt', type: 'meat'},
]
const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(ctrl => {
      return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                type={ctrl.type}
                disabled={props.disabled[ctrl.type]}
                removed={() => props.ingredientRemoved(ctrl.type)}
                added={() => props.ingredientAdded(ctrl.type)} />
          }
        )
      }
    </div>
  )
}

export default buildControls
