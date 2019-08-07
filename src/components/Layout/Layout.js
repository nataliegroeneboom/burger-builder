import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer : true
    }
    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    sideDrawerClosedHandler = () => {
        
        this.setState({showSideDrawer: false})
    }

    render(){
        return (
            <Aux>
            <Toolbar toggle={this.toggleSideDrawerHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={styles.content}>
                    {this.props.children}
                </main>
        </Aux>
        
        )
    }
} 

export default Layout;