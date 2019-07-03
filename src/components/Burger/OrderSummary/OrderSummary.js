import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const capitalize = {
        textTransform: "capitalize"
    }

    const order = Object.keys(props.ingredients)
        .map( igKey => {
            return <li key={igKey} ><span style={capitalize}>{igKey}: {props.ingredients[igKey]}</span></li>});

    
    return(
        <>
            <h3>Your Order</h3>
            <p>The ingredients in your delicious burger:</p>
            <ul>
                {order}
            </ul>
            <p><strong>Total Price: $ {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.orderCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.orderContinued}>CONTINUE</Button>
        </>
    );
}

export default orderSummary;