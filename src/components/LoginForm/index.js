import React from 'react';
import smokingLogo from '../../styles/images/ss.png';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '', 
            password: '', 
            email: '', 
            formsErrors: {
                
            }
        }
        
        localStorage.removeItem('JWT_TOKEN');
    }

    handleRedirectToLoginRegistrationForm = (path) => {
        this.props.history.push(path)
    }
    
    formValid = ({formsErrors, ...rest}) => {
        let valid = false;
        let loginError = formsErrors.login;
        let passwordError = formsErrors.password;
        let emailError = formsErrors.email;
        if((loginError > 0 || loginError === undefined) || (passwordError > 0 || loginError === undefined)  || (emailError > 0 || loginError === undefined)) {
            valid = false;
            return valid;
        }
        else {
            valid = true;
            return valid;
        }
    };

    handleForm = (login, password, email) => {
        if(!login  && !password && !email) {
            let formsErrors = this.state.formsErrors;
            formsErrors.credentials = 'uzupełnij wymagane pola';
            this.setState({
                formsErrors
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const {login, password, email} = this.state;
        if(this.formValid(this.state)) {
                let User = {
                    login: login,
                    password: password,
                    email: email
                }
                fetch(`${process.env.REACT_APP_API}auth/login`, 
                    {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(User)
                    }).then(response => {
                        if(response.status > 400) {
                            let formsErrors = this.state.formsErrors;
                            formsErrors.credentials = 'podałeś błędne dane logowania';
                            this.setState({
                            formsErrors
                })
                            
                        }
                        return response.json()
                    })
                    .then((data) => {
                        if (data.token) {
                            localStorage.setItem('JWT_TOKEN', data.token);
                            this.props.history.push('/addicition-form');
                        }
                        
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                    });
    
                    this.setState({
                        login: '',
                        password: '',
                        email: '',
                        formsErrors: {}
                    })
            }
            else {
                this.handleForm(login, password, email);
            }

    }

    handleChange = e => {
        e.preventDefault();
        const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        const {name, value} = e.target;
        let formsErrors = this.state.formsErrors;
        switch(name) {
            case 'login':
            formsErrors.login = value.length < 5 && value.length > 0 || !value.length
            ? 'uzupełnij pole(minimum 6 znaków)' 
            : '';
            break;
            case 'password':
            formsErrors.password = value.length < 5 && value.length > 0 || !value.length
            ? 'uzupełnij pole(minimum 6 znaków)'
            : '';
            break;
            case 'email':
            formsErrors.email = emailRegex.test(value) !== true || !value.length
            ? 'adres mailowy jest niepoprawny' 
            : '';
            break;
            default:
            break;
        }

        this.setState({formsErrors, [name] : value})
    }

    render() {
        const {login, password, email, formsErrors} = this.state;
        return(
            <div className="login">
                <div className="login__container">
                    <div className="login__item login__app-description">
                        <img className="login__logo" alt="cigaret" src={smokingLogo} />
                        <h4 className="heading-primary--sub">Aplikacja rzuć Palenie</h4>
                        <p className="paragraph">Rzucenie palenia nie jest łatwym zadniem. Wytrwarnie w postanowieniu wzmacniają efekty, 
                        które dzięki tej aplikacji możesz śledzić. Sprawdź ile zaoszczędziłeś, pieniędzy, 
                        życia oraz jak długo udało Ci się nie zapalić papierosa.</p>
                    </div>
                    <div className="login__item login__form-container">
                        <form onSubmit={this.handleSubmit} className="form">
                            <label className="form__label form__label--login paragraph">login</label>
                            <input
                                onChange={this.handleChange} 
                                name="login"
                                value={login}
                                className="form__input form__input--login"/>
                                {formsErrors['login'] && <label>{formsErrors.login}</label>}
                            <label className="form__label form__label--email paragraph">e-mail</label>
                            <input
                                onChange={this.handleChange} 
                                value={email} 
                                name="email"
                                className="form__input form__input--email"/>
                                {formsErrors['email'] && <label>{formsErrors.email}</label>}
                            <label className="form__label form__label--password paragraph">hasło</label>
                            <input
                                onChange={this.handleChange} 
                                value={password}
                                name="password" 
                                className="form__input form__input--password"/>
                                {formsErrors['password'] && <label>{formsErrors.password}</label>}
                                {formsErrors['credentials'] && <label>{formsErrors.credentials}</label>}
                            <input className="form__button paragraph" type="submit" value="zaloguj" />
                            <p className="paragraph">Nie masz jeszcze konta?
                                <span className="bold-addition-style" 
                                    onClick={() => this.handleRedirectToLoginRegistrationForm('/registration')}>
                                    Zarejestruj się
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>   
        )
    }
}

export default LoginForm;