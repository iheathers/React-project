import React from 'react';

import burgerLogo from '../../assest/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Burger" />
    </div>
)

export default logo;