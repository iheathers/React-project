import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENTS_PRICE = {
    meat: 1.5,
    bacon: 1,
    salad: 0.5,
    cheese: 0.5
}

class BurgerBuilder extends Component{

    state =  {
        ingredients: {
            
            salad: 0,
            cheese: 0,
            bacon:0,
            meat: 0
           
        },
        totalPrice: 5,
        purchasable: false,
        ordered: false,
        loading: false
    }

    orderHandler = () => {
       this.setState({ordered: true})
    }

    updatePurchaseState (ingredients){        

        const sum = Object.keys(ingredients)
        .map(
            (igKey) => {
                return ingredients[igKey]})
                .reduce((sum, element) => {
                  return sum + element;  
                },0);
            
        console.log(sum);
        
        this.setState({purchasable: sum>0});
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const addedPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + addedPrice;
        //console.log(newPrice);
       
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice}); 
        this.updatePurchaseState(updatedIngredients);
     
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;

        if (updatedCount < 0 ){
            return;
        }

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const deductedPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - deductedPrice;
        //console.log(newPrice);
        
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice}); 
        this.updatePurchaseState(updatedIngredients);
    }

    orderCancelledHandler = () => {
        this.setState({ordered: false})
    }

    orderContineHandler = () => {
        this.setState({loading: true})
        const orders = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Night King",
                address: {
                    street: "Beyond The Wall",
                    country: "The North",
                    postalCode: "Send a raven idiot!!"
                }
            }
        }
        axios.post('/orders.json',orders)
        .then(response => 
            this.setState({loading: false, ordered: false})
            )
        .catch(error => 
            this.setState({loading: false, ordered: false})
            )
    }
  


    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary =  <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                orderContinued={this.orderContineHandler}
                orderCancelled={this.orderCancelledHandler}
            /> ;

        if (this.state.loading){
            orderSummary = <Spinner/>
        }

        //console.log(disabledInfo);

        return (            
            <>
                <Burger ingredients={this.state.ingredients} />
                {/* console.log(this.state.purchasable) */}

                <Modal show={this.state.ordered} cancel={this.orderCancelledHandler}>
                    {orderSummary}
                </Modal>
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.orderHandler}/>
            </>
        );
    }        
}

export default withErrorHandler(BurgerBuilder, axios);