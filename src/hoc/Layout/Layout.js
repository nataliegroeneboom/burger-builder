import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer : false
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