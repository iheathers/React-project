import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Bacon', type:'bacon'}, 
    {label: 'Meat', type:'meat'}
    
];


const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
       {controls.map((control) => 
         <BuildControl 
            key={control.label}
            ingredientLabel={control.label}
            added={() => props.addIngredient(control.type)}
            removed={() => props.removeIngredient(control.type)}
            disabled={props.disabled[control.type]}
             /> )}

        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW!</button>        
    </div>
);

export default buildControls;