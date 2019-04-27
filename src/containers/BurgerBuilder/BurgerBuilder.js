import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        purchasable: false
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

  


    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        //console.log(disabledInfo);

        return (

            
            <>
                <Burger ingredients={this.state.ingredients} />
                {console.log(this.state.purchasable)}
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}/>
            </>
        );
    }        
}

export default BurgerBuilder;