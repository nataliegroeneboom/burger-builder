import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
  
class BurgerBuilder extends Component {
   
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-44ce7.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        }).catch(
            error => {
                this.setState({error: true})
            }
        );
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
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
           ingredients: updatedIngredients,
           totalPrice: newPrice 
        });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
           ingredients: updatedIngredients,
           totalPrice: newPrice 
        });
        this.updatePurchaseState(updatedIngredients);
    };

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
        // this.setState({loading: true})
        // console.log('continue button clicked');
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Natalie',
        //         address: {
        //             street: 'Street 1',
        //             postCode: '34566',
        //             country: 'UK'
        //         },
        //         email: "test@test.com",
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // // alert('You continue');
        // axios.post('/orders.json', order)
        // .then(response => {
        //     this.setState({loading: false, purchasing: false})
        // })
        // .catch(error => {
        //     this.setState({loading: false, purchasing: false})
        // });
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?'+ queryString
        });
    }


render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =  null;
        if(this.state.loading ){
            orderSummary = <Spinner />
        }
        let burger = this.state.error?<div>Ingredients can't be loaded</div>:<Spinner />;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                                ingredientAdded={this.addIngredientHandler}
                                ingredientRemoved={this.removeIngredientHandler}
                                disabled={disabledInfo}
                                purchaseable={this.state.purchaseable}
                                price={this.state.totalPrice}
                                ordered={this.purchaseHandler}
                    />
                </Aux>
              );
           orderSummary = (<OrderSummary 
                                ingredients={this.state.ingredients}
                                purchaseCancelled = {this.purchaseCancelled}
                                purchaseContinued = {this.purchaseContinueHandler}
                                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);