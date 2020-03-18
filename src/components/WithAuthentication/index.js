import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import LoginForm from 'components/LoginForm';
import UserPage from 'components/UserPage';
import NavBar from 'components/NavBar';

const WithAuthentication = (PassedComponent) => {
    class AuthHOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = { 
                token: this.getToken(),
                _id : null
        };
        }

        handleTokenAuth = (response, path) => {
            const redirectCases = ['TokenExpiredError', 'JsonWebTokenError'];
            if(redirectCases.includes(response.name)) {
                this.props.history.push(path);
                localStorage.removeItem("JWT_TOKEN");

            } else {
                const _id = response.data._id;
                this.setState({
                    _id
                })
            }
        }

        getToken = () => {
            const token = localStorage.getItem('JWT_TOKEN');
            const body = JSON.stringify({token});
            fetch(`${process.env.REACT_APP_API}auth`, {
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
            return (
                <div>
                    {this.state._id ? <PassedComponent _id={this.state._id} history={this.props.history}/> : null}
                </div>
            )
        }
    }
    return AuthHOC;
} 

export default WithAuthentication;
