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

/*
nie hardcodowac routow, przypisac do jakiegos JSowego albo JSONowego pliku konfiguracyjnego lub zmiennych srodowiskowych
(ale lepiej config, bo bedziesz mogl go sobie do woli mapowac)

routes.json 
[
    { pathname: "/login", label: 'Login"}
]

lub 

routes.js 
export default [
    { pathname: "/login", label: 'Login", component: Login }
]
*/


export default withRouter(NavBar);