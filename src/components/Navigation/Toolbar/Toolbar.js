import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggle}/>
       <div className={classes.Logo}>
            <Logo height="80%" />
       </div>    
        <nav>
        <NavigationItems />  
        </nav>
    </header>
);

export default toolbar;