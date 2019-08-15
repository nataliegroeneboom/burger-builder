import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';



  
class BurgerBuilder extends Component {
   
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('https://react-my-burger-44ce7.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // }).catch(
        //     error => {
        //         this.setState({error: true})
        //     }
        // );
    }

    updatePurchaseState(ingredients){
        /** Object.keys will take an object and convert it to an array of keys 
         * such that is will be ['salad', 'bacon', 'cheese', 'meat']
         */
        const sum = Object.keys(ingredients)
        /** then map through the keys to get the values */
        .map(igKey => {
            return ingredients[igKey];
        })
        /** Reduce takes a function (the reducer function) and the initial value
         * The reducer function takes the accumulated value and the current value
         * so in [1,3,4] where the reducer function is (acc, current) => acc + current
         * the first iteration the acc would be 0 and the current value 1
         * in the second iteration the acc would be 1 and current 3
         * in the third iteration the ac would be 4 and the current would be 4
         * the output would be 8
         */
        .reduce((sum, el) => {return sum + el}, 0);
      return sum > 0;
    }


    purchaseHandler = () => {
      
        this.setState({
            purchasing: true
        });
    }
    purchaseCancelled = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => { 
        this.props.history.push('/checkout');
    }


render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =  null;
        if(this.state.loading ){
            orderSummary = <Spinner />
        }
        let burger = this.state.error?<div>Ingredients can't be loaded</div>:<Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                                ingredientAdded={this.props.onIngredientAdded}
                                ingredientRemoved={this.props.onIngredientRemoved}
                                disabled={disabledInfo}
                                purchaseable={this.updatePurchaseState(this.props.ings)}
                                price={this.props.price}
                                ordered={this.purchaseHandler}
                    />
                </Aux>
              );
           orderSummary = (<OrderSummary 
                                ingredients={this.props.price}
                                purchaseCancelled = {this.purchaseCancelled}
                                purchaseContinued = {this.purchaseContinueHandler}
                                price={this.props.price}
                        />);
        }
       
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed = {this.purchaseCancelled}    
                    >
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded:(ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved:(ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})   
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));