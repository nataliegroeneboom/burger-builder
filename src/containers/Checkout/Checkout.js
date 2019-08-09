import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {
    state={
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        const newIngredients = {};
       for(let param of params.entries()){
            newIngredients[param[0]] = +param[1]
       }
    //    newIngredients.meat = params.get('meat');
    //    newIngredients.cheese = params.get('cheese');
    //    newIngredients.salad = params.get('salad');
    //    newIngredients.bacon = params.get('bacon');
     
       this.setState({
        ingredients: newIngredients
       });

       console.log(this.state);
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
            </div>
        )
    }
}

export default Checkout;