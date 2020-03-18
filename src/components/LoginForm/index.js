import React from 'react';
import smokingLogo from '../../styles/images/ss.png';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '', 
            password: '', 
            email: '', 
            formValid: null,
            valid: {
    
            },
            errors: {
    
            }
        }
        localStorage.removeItem('JWT_TOKEN');
    }


    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    } 
    
    validateLogin = () => {
        let validLogin = false;
        let errorLoginMessage = '';
        const {login} = this.state;
        if(!login) {
            validLogin = false;
            errorLoginMessage = 'wypełnij pole';
            return {validLogin, errorLoginMessage}
        }
        else if(login.length < 4) {
            validLogin = false;
            errorLoginMessage = 'podany login jest za krótki';
            return {validLogin, errorLoginMessage}
        }
        else if(login.indexOf(' ') !== -1) {
            validLogin = false;
            errorLoginMessage = 'login nie może zawierać spacji'
            return {validLogin, errorLoginMessage}
        }
        else {
            validLogin = true;
            errorLoginMessage = ''
            return {validLogin, errorLoginMessage}
        }
    }

    validatePassword = () => {
        const {password} = this.state;
        let validPassword = false;
        let errorPasswordMessage = ''
        if(!password) {
            validPassword = false;
            errorPasswordMessage = 'uzupełnij swoje hasło';
            return {validPassword, errorPasswordMessage};
        }
        else if(password.indexOf(' ') !== -1) {
            validPassword = false;
            errorPasswordMessage = 'hasło nie może zawierać spacji';
            return {validPassword, errorPasswordMessage};
        }
        else if(password.length < 8) {
            validPassword = false;
            errorPasswordMessage = 'hasło nie może być krótsze niż 8 znaków';
            return {validPassword, errorPasswordMessage};
        }
        else {
            validPassword = true;
            errorPasswordMessage = '';
            return {validPassword, errorPasswordMessage};
        }
    }

    validateEmail = () => {
        const { email } = this.state;
        let validEmail = false;
        let errorEmailMessage = '';
        if(!email) {
            validEmail = false;
            errorEmailMessage = 'uzupełnij pole';
            return {validEmail, errorEmailMessage};
        }
        if(email.indexOf('@') === -1) {
            validEmail = false;
            errorEmailMessage = 'wpisz poprawny adres z @';
            return {validEmail, errorEmailMessage};
        }
        else {
            validEmail = true;
            errorEmailMessage = '';
            return {validEmail, errorEmailMessage};
        }
    }

    validateForm = () => {
        let loginValidResult = this.validateLogin();
        let passwordValidResult = this.validatePassword();
        let emailValidResult = this.validateEmail()
        let errors = {
            login: loginValidResult.errorLoginMessage,
            password: passwordValidResult.errorPasswordMessage,
            email: emailValidResult.errorEmailMessage
        }
        let valid = {
            validateLogin: loginValidResult.validLogin,
            validatePassword: passwordValidResult.validPassword,
            validateEmail: emailValidResult.validEmail
        }
        const isValid = valid.validateLogin && valid.validatePassword && valid.validateEmail;

        if (!isValid) {
            this.setState({
                errors,
                valid
            })
        }
        return true;
    }

    handleSubmitForm = e => {
        e.preventDefault();
        if(this.validateForm()) {
            let User = {
                login: this.state.login,
                password: this.state.password,
                email: this.state.email
            }
            fetch(`${process.env.REACT_APP_API}/auth/login`, 
                {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(User)
                }).then(response => {
                    if(response.status !== 200) {
                        return false;
                    }
                    return response.json()
                })
                .then((data) => {
                    if (data.token) {
                        localStorage.setItem('JWT_TOKEN', data.token);
                        console.log(this.props.history)
                        this.props.history.push('/addicition-form');
                    }
                    
                })
                .catch((error) => {
                    console.error('Error:', error)
                });
                this.setState({
                    login: '',
                    password: '',
                    email: ''
                })
        }
    }

    handleRedirectToLoginRegistrationForm = (path) => {
        this.props.history.push(path)
    }

    render() {
        const {login, password, email, errors} = this.state;
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
                        <form onSubmit={this.handleSubmitForm} className="form">
                            <label className="form__label form__label--login paragraph">login</label>
                            <input
                                onChange={this.handleChange} 
                                name="login"
                                value={login}
                                className="form__input form__input--login"/>
                                {errors['login'] && <label>{errors.login}</label>}
                            <label className="form__label form__label--email paragraph">e-mail</label>
                            <input
                                onChange={this.handleChange} 
                                value={email} 
                                name="email"
                                className="form__input form__input--email"/>
                                {errors['email'] && <label>{errors.email}</label>}
                            <label className="form__label form__label--password paragraph">hasło</label>
                            <input
                                onChange={this.handleChange} 
                                value={password}
                                name="password" 
                                className="form__input form__input--password"/>
                                {errors['password'] && <label>{errors.password}</label>}
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