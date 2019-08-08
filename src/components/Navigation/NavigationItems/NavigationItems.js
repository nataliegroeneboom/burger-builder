import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {Link} from 'react-router-dom';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
       <Link to="/" exact><NavigationItem link="/" active>Burger Builder</NavigationItem>   </Link> 
      <Link to="/checkout"><NavigationItem link="/">Checkout</NavigationItem></Link>
    </ul>
);

export default navigationItems;