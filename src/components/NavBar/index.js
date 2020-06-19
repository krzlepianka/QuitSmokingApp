import React from 'react';
import {withRouter} from 'react-router-dom';


const NavBar = (props) => {
    const logoutUser = () => {
        localStorage.removeItem('JWT_TOKEN');
        props.history.push('/login');
    }
    return(
        <div>
            <header className="header">
                <ul className="header__list">
                    <li className="header__item" onClick={logoutUser}>Wyloguj</li>   
                </ul>
            </header>
            {props.children}
        </div>
    );
}


export default withRouter(NavBar);