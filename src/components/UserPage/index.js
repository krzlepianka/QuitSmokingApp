import React from 'react';
import smokingLogo from '../../styles/images/ss.png';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        cigaretsPerDay: 0,
        duration: 0,
        price: 0,
        valid: {},
        errors: {},
        formValid: null
    }
}

    checkIfNewUser = () => {
        fetch(`${process.env.REACT_APP_API}user`)
        .then(response => response.json())
        .catch(error => console.log('error', error))
        .then((users) => {
            const currentUser = users.filter(user => user._id === this.props._id);
            const result = currentUser[0];
            if(result.price) {
                this.props.history.push('/dashboard');
            }
        })
    }

    componentDidMount() {
        this.checkIfNewUser();
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        })
    }
    validateNumberInput = (input) => {
        let validValue = false;
        let errorMessage = '';
        if(!input) {
            //validValue = false;
            return 'uzupełnij pole'
            
            //return {validValue, errorMessage}
        }
        if(input === "0") {
            return 'podaj liczbę większą niż 0';
        }
        if (!typeof input === 'number') {
            //validValue = false;
            return `${input} is not a number`
            
            ////return {validValue, errorMessage}
        }
        if(input < 0) {
            //validValue = false;
            return `${input} jest mniejszy od zera`

            //return {validValue, errorMessage}
        }
        else {
            //validValue = true;
            return ``
            
        }
    }

    validateForm = () => {
        const {cigaretsPerDay, duration, price} = this.state;
        let validCigaret = this.validateNumberInput(cigaretsPerDay);
        let validDuration = this.validateNumberInput(duration);
        let valiPrice = this.validateNumberInput(price);
        const errors = {
            cigaretsPerDay: this.validateNumberInput(cigaretsPerDay),
            duration: this.validateNumberInput(duration),
            price: this.validateNumberInput(price)
        }
        let formValid = errors.cigaretsPerDay.length === 0 && errors.duration.length === 0 && errors.price.length === 0
        this.setState({
            errors,
            formValid
        })
}

    handleSubmit = e => {
        e.preventDefault();
        const { formValid } = this.state;
        this.validateForm();
        if(formValid) {
    
        const {cigaretsPerDay, duration, price} = this.state;
            let setupInformation = {
                _id: this.props._id,
                cigaretsPerDay, 
                duration, 
                price
            }     
        fetch(`${process.env.REACT_APP_API}user`,  {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(setupInformation)
        })
        .then(res => res.json())
        .then((data) => {
            this.props.history.push('/dashboard');
        })
        .catch((error) => {
            console.log('Error:', error)
        })
    }
}
    

    render() {
        const {errors} = this.state;
        return(
            <div className="setup">
                <div className="login__item login__app-description setup__text-manual">
                        <img className="login__logo setup--logo" alt="cigaret" src={smokingLogo} />
                        <h4 className="heading-primary--sub">Wprowadź dane</h4>
                        <p className="paragraph">Wprowadz informacje na tematy swojego palenia.
                        Na tej podstawie przygotujemy kalkulator, dzięki, któremy co sekundę będziesz widział ile zaoszczędzasz 
                        pieniędzy oraz życia.</p>
                </div>
                <div className="setup__form-container">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input 
                            className="form__input form__input--cigarets"
                            onChange={this.handleChange} 
                            type='number'
                            name="cigaretsPerDay" 
                        />
                        <label 
                            className="form__label paragraph">
                            ile wypalasz papierosów na dzień
                        </label>
                        { errors['cigaretsPerDay'] && <label>{errors.cigaretsPerDay}</label> }
                        <input 
                            className="form__input form__input--duration" 
                            onChange={this.handleChange} 
                            type='number'
                            name="duration" 
                        />
                        <label 
                            className="form__label paragraph">
                            od kiedy zacząłeś palić
                        </label>
                        { errors['duration'] && <label>{errors.duration}</label> }
                        <input 
                            className="form__input form__input--price" 
                            onChange={this.handleChange}
                            type='number' 
                            name="price"
                        />
                        <label
                            className="form__label paragraph">
                            cena jednej paczki papierosów
                        </label>
                        { errors['price'] && <label>{errors.price}</label> }
                        <input 
                            className="form__button" 
                            type="submit" 
                            value="wyślij" />
                    </form>
                </div>
            </div>
        )
    }
};

export default UserPage;