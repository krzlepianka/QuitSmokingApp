import React from 'react';
import smokingLogo from '../../styles/images/ss.png'

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
        successfulRegistrationMeassage: ''
    }


    componentDidUpdate = () => {
        const {successfulRegistrationMeassage} = this.state;
        if(successfulRegistrationMeassage !== '') {
            setTimeout(() => this.setState({
                successfulRegistrationMeassage: ''
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
            errorLoginMessage = 'uzupełnij pole'
            return {validLogin, errorLoginMessage}
        }
        if(login.length < 4) {
            validLogin = false;
            errorLoginMessage = 'login musi się składać z przynajmniej 4 znaków'
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
            errorEmailMeassage = 'uzupełnij pole'
            return {validEmail, errorEmailMeassage}
        }
        else if(email.indexOf('@') === -1) {
            validEmail = false;
            errorEmailMeassage = 'wpisz poprawny adres z @'
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
            errorPasswordMeassage = 'uzupełnij pole';
            return {validPassword, errorPasswordMeassage}
            
        }
        else if(password.indexOf(' ') !== -1) {
            validPassword = false;
            errorPasswordMeassage = 'hasło nie może zawierać spacji';
            return {validPassword, errorPasswordMeassage}
        }
        else if(password.length < 8) {
            validPassword = false;
            errorPasswordMeassage = 'hasło musi zawierać przynajmnije 8 znaków';
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
        this.setState({
            valid, 
            errors,
            formValid: valid.validLogin && valid.validEmail && valid.validPassword
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
            fetch(`${process.env.REACT_APP_API}auth/register`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
                })
                .then((response) => response.json())
                .then((data) => {
                console.log('Success:', data);
                })
                .catch((error) => {
                console.error('Error:', error);
                });
                this.setState({
                    login: '',
                    email: '',
                    password: '',
                    successfulRegistrationMeassage: 'Rejestracja się powiodła, możesz się zalogować'
                })
        }
    }


    render() {
        const {login, email, password, errors, successfulRegistrationMeassage } = this.state;
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
                                {successfulRegistrationMeassage && <p className="paragpraph">{successfulRegistrationMeassage}</p>}
                            </form>
                        </div>
                    </div>
            </div>
        )
    }
}

export default RegistrationForm;