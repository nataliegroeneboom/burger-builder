import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input', 
                elementConfig: {
                            type: 'text',
                            placeholder: 'Your Name'
                             },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                
            },
            email: {
                elementType: 'input', 
                elementConfig: {
                            type: 'email',
                            placeholder: 'Your Email'
                             },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                
            },
            street: {
                elementType: 'input', 
                elementConfig: {
                            type: 'text',
                            placeholder: 'Your Street'
                             },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postCode: {
                elementType: 'input', 
                elementConfig: {
                            type: 'text',
                            placeholder: 'Your Post Code'
                             },
                value:'',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 8
                }
            },
            country:{
                elementType: 'input', 
                elementConfig: {
                            type: 'text',
                            placeholder: 'Country'
                             },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select', 
                elementConfig: {
                           options: [
                               {value: 'fastest', displayValue: 'Fastest'},
                               {value: 'cheapest', displayValue: 'Cheapest'}
                            ]
                        },
                value:'fastest',
                validation: {},
                valid: true
            }    
        },
        formIsValid: false,
    }

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = (value.trim() !== '') && isValid;
        }
        if(rules.minLength){
            isValid = (value.length >= rules.minLength) && isValid;
        }
        if(rules.maxLength){
            isValid = (value.length <= rules.minLength) && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
      
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm ){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
        }
        this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event, inputIdentifier) => {
       const updatedOrderForm = {
           ...this.state.orderForm
       }
       const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
       updatedFormElement.value = event.target.value;
       updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
       updatedFormElement.touched = true;
       updatedOrderForm[inputIdentifier] = updatedFormElement;
       
       let formIsValid = true;
       for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
       }

       this.setState({orderForm : updatedOrderForm, formIsValid: formIsValid})


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
            <form onSubmit={this.orderHandler}>
                  {formElementsArray.map(formElement =>(
                      <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        change={(event) => {this.inputChangedHandler(event, formElement.id)}}
                        />
                  ) )}
                  <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if(this.props.loading){
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
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{ 
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }   
}

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));