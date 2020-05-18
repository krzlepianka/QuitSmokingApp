import React from 'react';
import {Redirect} from 'react-router-dom';


const withAuthentication = (PassedComponent) => {
    class AuthHOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = { 
                token: this.getToken(),
                _id : null,
                isLogin: null
        };
        }

        handleTokenAuth = (response, path) => {
            /*
            kiedy robisz zmiany w state po ukonczeniu funkcji asynchronicznej, upewniej sie wpierw, ze Twoj komponent jest wciaz zamontowany w DOMie
            czyli:
            componentDidMount() { this.mounted = true; }
            componentWillUnmount(){ this.mounted = false; }

            ...
            this.mounted && this.setState(...)
            */
            const redirectCases = ['TokenExpiredError', 'JsonWebTokenError'];
            if(redirectCases.includes(response.name)) {
                this.props.history.push(path);
                localStorage.removeItem("JWT_TOKEN"); // hardcodowane, powinno byc przypisane do zmiennej srodowiskowej

            } else {
                const _id = response.data._id;
                this.setState({
                    _id,
                    isLogin: true
                })
            }
        }

        getToken = () => {
            const token = localStorage.getItem('JWT_TOKEN');
            fetch(`${process.env.REACT_APP_API}/auth`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((data) => this.handleTokenAuth(data, '/login'))
            .catch((error) => {
                console.error('Error:', error)
            });

            return token;
        }

        
        render() {
            if (!this.state.token) {
                return <Redirect to="login" />;
            }   
            if (this.state._id) {
                return <PassedComponent _id={this.state._id} history={this.props.history}/>;
            }

            return null;
        }
    }
    return AuthHOC;
} 

export default withAuthentication;
