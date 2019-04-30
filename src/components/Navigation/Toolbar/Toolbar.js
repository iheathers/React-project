import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawer from '../SideDrawer/SideDrawer';


const toolbar = (props) => {
    return (
        
       
            <header className={classes.Toolbar}>
                <div onClick={props.showMenu}>
                    MENU
                    <SideDrawer open={props.openMenu}/>
                    
                </div>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                
                <nav className={classes.DesktopOnly}>
                    <NavigationItems />
                
                </nav>
        </header>
        
    );


}

export default toolbar;