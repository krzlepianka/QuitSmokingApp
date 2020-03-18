import React from 'react';
import {Link} from 'react-router-dom';


const NavBar = () => {
    return(
        <header className="header">
            <ul className="header__list">
                <li className="header__item"><Link className="header__link">Dziennik</Link></li>
                <li className="header__item"><Link className="header__link">Wylogowanie</Link></li>            
            </ul>
        </header>
    );
}



export default NavBar;