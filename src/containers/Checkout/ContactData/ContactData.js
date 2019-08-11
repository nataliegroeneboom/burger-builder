import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input', 
                elementConfig: {
                            type: 'text',
                            placeholder: 'Your Name'
                             },
                value:''
            },
            email: {
                elementType: 'input', 
                elementConfig: {
                            type: 'email',
                            placeholder: 'Your Email'
                             },
                value:''
            },
            street: {
                elementType: 'input', 
                elementConfig: {
                            type: 'text',
                            placeholder: 'Your Street'
                             },
                value:''
            },
            postCode: {
                elementType: 'input', 
                elementConfig: {
                            type: 'text',
                            placeholder: 'Your Post Code'
                             },
                value:''
            },
            country:{
                elementType: 'input', 
                elementConfig: {
                            type: 'text',
                            placeholder: 'Country'
                             },
                value:''
            },
            deliveryMethod: {
                elementType: 'select', 
                elementConfig: {
                           options: [
                               {value: 'fastest', displayValue: 'Fastest'},
                               {value: 'cheapest', displayValue: 'Cheapest'}
                            ]
                        },
                value:''
            }    
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Natalie',
                address: {
                    street: 'Street 1',
                    postCode: '34566',
                    country: 'UK'
                },
                email: "test@test.com",
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false})
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
       const updatedOrderForm = {
           ...this.state.orderForm
       }
       const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
       updatedFormElement.value = event.target.value;
       updatedOrderForm[inputIdentifier] = updatedFormElement;
       this.setState({orderForm : updatedOrderForm})


    }
    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                  {formElementsArray.map(formElement =>(
                      <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        change={(event) => {this.inputChangedHandler(event, formElement.id)}}
                        />
                  ) )}
                  <Button clicked={this.orderHandler} btnType="Success">Order</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;