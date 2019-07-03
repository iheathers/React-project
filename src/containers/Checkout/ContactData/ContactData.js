import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '', 
        email: '', 
        address: {
            street: '', 
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        console.log(this.props.ingredients)
        this.setState({loading: true})
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        .then(response => {
            this.setState({loading: false, ordered: false});
            this.props.history.push('/')}
            )
        .catch(error => 
            this.setState({loading: false, ordered: false})
            )
    }
    render(){

        let form = (  <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="name" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
               
            </div>
        )
    }
}

export default ContactData;