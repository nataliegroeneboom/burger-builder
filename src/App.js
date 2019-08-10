import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
    <Router>
        <div >
          <Layout>
            <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
            </Switch>
          </Layout>  
        </div>
    </Router>
   
    );   
  }
 
}

export default App;
