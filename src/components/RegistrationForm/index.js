import React from 'react';
import smokingLogo from '../../styles/images/ss.png'
import * as errorMsgSetup from './../shared/errorsMsgSetup/errorsMsgSetup';

class RegistrationForm extends React.PureComponent {
    state = {
        login: '',
        password: '',
        email: '',
        formValid: null,
        formsErrors: {
            login: '',
            password: '',
            email: ''
        },
        errors: {
        
        },
        valid: {

        },
        registrationMessage: ''
    }


    componentDidUpdate = () => {
        const {registrationMessage} = this.state;
        if(registrationMessage !== '') {
            setTimeout(() => this.setState({
                registrationMessage: ''
            }), 5000)
        }
    }

    handleRedirectToLoginForm = (path) => {
        this.props.history.push(path)
    }

    handleChange = (e) => {
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
            errorLoginMessage = errorMsgSetup.fillInput;
            return {validLogin, errorLoginMessage}
        }
        if(login.length < 6) {
            validLogin = false;
            errorLoginMessage = errorMsgSetup.wrongLoginRequires;
            return {validLogin, errorLoginMessage}
        }
        else {
            validLogin = true;
            errorLoginMessage = '';
            return {validLogin, errorLoginMessage}
        }
    }

    validateEmail = () => {
        let validEmail = false;
        let errorEmailMeassage = '';
        const {email} = this.state;
        if(!email) {
            validEmail = false;
            errorEmailMeassage = errorMsgSetup.fillInput;
            return {validEmail, errorEmailMeassage}
        }
        else if(email.indexOf('@') === -1) {
            validEmail = false;
            errorEmailMeassage = errorMsgSetup.wrongEmailRequires;
            return {validEmail, errorEmailMeassage}
        }
        else {
            validEmail = true;
            errorEmailMeassage = ''
            return {validEmail, errorEmailMeassage}
        }
    }

    validatePassword = () => {
        let validPassword = false;
        let errorPasswordMeassage = '';
        const {password} = this.state;
        if(!password) {
            validPassword = false;
            errorPasswordMeassage = errorMsgSetup.fillInput;
            return {validPassword, errorPasswordMeassage}
            
        }
        else if(password.indexOf(' ') !== -1) {
            validPassword = false;
            errorPasswordMeassage = errorMsgSetup.whiteSpacePassword;
            return {validPassword, errorPasswordMeassage}
        }
        else if(password.length < 6) {
            validPassword = false;
            errorPasswordMeassage = errorMsgSetup.wrongPasswordRequires;
            return {validPassword, errorPasswordMeassage}
        }
        else {
            validPassword = true;
            errorPasswordMeassage = '';
            return {validPassword, errorPasswordMeassage}
        }
    }

    validateForm = () => {
        let loginValidResult = this.validateLogin();
        let emailValidResult = this.validateEmail();
        let passwordValidResult = this.validatePassword();
        const errors = {
            login: loginValidResult.errorLoginMessage,
            email: emailValidResult.errorEmailMeassage,
            password: passwordValidResult.errorPasswordMeassage
        }
        const valid = {
            validLogin: loginValidResult.validLogin,
            validEmail: emailValidResult.validEmail,
            validPassword: passwordValidResult.validPassword
        }
        let validArray = Object.keys(valid).map(key => {
            return valid[key]
        });
        let checkValidArray = validArray.every(element => element === true);
        this.setState({
            valid, 
            errors,
            formValid: checkValidArray
        })
    }

    handleSubmitForm = e => {
        e.preventDefault();
        this.validateForm(e);
        if(this.state.formValid) {
            let newUser = {
                login: this.state.login,
                password: this.state.password,
                email: this.state.email
            }
            fetch(`${process.env.REACT_APP_API}/auth/register`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)})
                .then(res => {
                    if(!res.ok) {
                        throw new Error(res)
                    }
                    return res.json();
                })
                .then(data => {
                    this.setState({
                        registrationMessage: data
                    })
                })
                .catch(error => {
                    this.setState({
                        registrationMessage: error.message
                    })
                })
        }
    }


    render() {
        const {login, email, password, errors, registrationMessage } = this.state;
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
                            <form onSubmit={this.handleSubmitForm} noValidate className="form">
                                <label className="form__label form__label--login paragraph">login</label>
                                <input 
                                    name="login"
                                    value={login}
                                    onChange={this.handleChange} 
                                    className="form__input form__input--login"/>
                                    { errors['login'] && <label>{errors.login}</label> }
                                <label className="form__label form__label--email paragraph">e-mail</label>
                                <input
                                    value={email} 
                                    name="email"
                                    onChange={this.handleChange}
                                    className="form__input form__input--email"/>
                                    {errors['email'] && <label>{errors.email}</label>}
                                <label className="form__label form__label--password paragraph">hasło</label>
                                <input
                                    value={password}
                                    name="password"
                                    onChange={this.handleChange} 
                                    className="form__input form__input--password"/>
                                    {errors['password'] && <label>{errors.password}</label>}
                                <button className="form__button paragraph" type="submit">ZAREJESTRUJ</button>
                                <p className="paragraph">Masz już konto?
                                    <span onClick={() => this.handleRedirectToLoginForm('/login')} className="bold-addition-style">
                                        Zaloguj się
                                    </span>
                                </p>
                                {registrationMessage && <p className="paragpraph">{registrationMessage}</p>}
                            </form>
                        </div>
                    </div>
            </div>
        )
    }
}

export default RegistrationForm;