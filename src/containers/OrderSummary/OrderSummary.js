import React from 'react';

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

            <p>Continue to Checkout?</p>
        </>
    );
}

export default orderSummary;