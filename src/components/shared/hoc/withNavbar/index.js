import React from 'react';
import NavBar from 'components/NavBar';

const withNavbar = (PassedComponent) => {
    class NavbarHoc extends React.Component {
        render() {
            return(
                <NavBar><PassedComponent {...this.props} /></NavBar>
            )
        }
    }
    return NavbarHoc;
}

export default withNavbar;
