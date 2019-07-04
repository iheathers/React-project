import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
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

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        ordered: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-burger-builder-3de3e.firebaseio.com/ingredients.json')
            .then(response => {
                //console.log(response);
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    orderHandler = () => {
        this.setState({ ordered: true })
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(
                (igKey) => {
                    return ingredients[igKey]
                })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);

        console.log(sum);

        this.setState({ purchasable: sum > 0 });
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const addedPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + addedPrice;
        //console.log(newPrice);

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;

        if (updatedCount < 0) {
            return;
        }

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const deductedPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - deductedPrice;
        //console.log(newPrice);

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    orderCancelledHandler = () => {
        this.setState({ ordered: false })
    }

    orderContineHandler = () => {

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: '/checkout',
            search: "?" + queryString

        });

    }



    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p style={{ textAlign: "center" }}>Ingredients can't be fetched from server</p> : <Spinner />

        if (this.state.ingredients) {
            burger =
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.orderHandler} />
                </>
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                orderContinued={this.orderContineHandler}
                orderCancelled={this.orderCancelledHandler} />

            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }

        return (
            <>
                {burger}

                <Modal show={this.state.ordered} cancel={this.orderCancelledHandler}>
                    {orderSummary}
                </Modal>

            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);