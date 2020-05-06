import React from 'react';
import { setInterval } from 'timers';
import parseNumber from 'helpers/parseNum';
import parseMoney from 'helpers/parseMoney';
import parseDays from 'helpers/parseDays';
import { number } from 'prop-types';
import saveMoneyImg from '../../styles/images/money.png';
import saveLifeImg from '../../styles/images/heart.png';
import noSmokingImg from '../../styles/images/smoking.png';
import TimeImg from '../../styles/images/history.png';


class UserInfoPage extends React.Component {

    state = {
        currentUser: {},
        savedMoney: 0,
        savedDays: 0,
        savedHours: 0,
        savedMinutes: 0,
        savedSeconds: 0,
        notSmokingCigarets: 0,
        noSmokingDays: 0,
        noSmokingHours: 0,
        noSmokingMinutes: 0,
        noSmokingSeconds: 0,
    }

    getUserInformation = () => {
        fetch(`${process.env.REACT_APP_API}/user?id=${this.props._id}`)
        .then(response => response.json())
        .catch(error => console.log('error', error))
        .then(user => {
            this.setState({
                currentUser: user
            })
            this.calculateDifferenceDatesMoney();
            this.calculateDifferenceDatesLife();
            this.calculateDifferenceDatesnoSmokingCigarets();
            setInterval(this.calculateDifferenceHowLongYouDontSmoke, 1000);
        })
    }

    componentDidMount() {
        this.mounted = true;
        this.getUserInformation();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    calculateDifferenceDatesMoney = (user=false) => {
        const currentUser = user || this.state.currentUser;
        const oneCigaretPrice = (currentUser.price / currentUser.cigaretsPerDay);
        const setUpDate = this.state.currentUser.firstSetupDate;
        let convertedSetUpDate = new Date(setUpDate);
        let today = new Date();
        let milisecondsDifference = today.getTime() - convertedSetUpDate.getTime();
        let secondsDifference = milisecondsDifference / 1000;
        let secondsBetweenDates = Math.abs(secondsDifference);
        let smokedCigaretsBetweenDates = (secondsBetweenDates * currentUser.cigaretsPerDay) / 86400;
        let savedMoneyBetweenDates = smokedCigaretsBetweenDates * oneCigaretPrice;
        this.mounted && this.setState(prevState => ({
            savedMoney: (prevState.savedMoney + savedMoneyBetweenDates)
        }));
        setInterval(this.calculateSavedMoney.bind(this, user), 1000);
    }

    calculateSavedMoney = (user=false) => {
        const currentUser = user || this.state.currentUser;
        const oneCigaretPrice = (currentUser.price / currentUser.cigaretsPerDay);
        const smokingCigaretPerSec = (currentUser.cigaretsPerDay / 86400);
        const oneSecMoneySaved = (oneCigaretPrice * smokingCigaretPerSec);
        this.mounted && this.setState(prevState => ({
            savedMoney: (prevState.savedMoney + oneSecMoneySaved)
        }));
    }


    calculateDifferenceDatesLife = (user=false) => {
        const currentUser = user || this.state.currentUser;
        const oneCigaretPrice = (currentUser.price / currentUser.cigaretsPerDay);
        const setUpDate = this.state.currentUser.firstSetupDate;
        let convertedSetUpDate = new Date(setUpDate);
        let today = new Date();
        let milisecondsDifference = today.getTime() - convertedSetUpDate.getTime();
        let secondsDifference = milisecondsDifference / 1000;
        let secondsBetweenDates = Math.abs(secondsDifference);
        const smokingCigaretPerSec = (currentUser.cigaretsPerDay / 86400)
        let savedLifePrice = secondsBetweenDates * 660;
        const savedLife = smokingCigaretPerSec * savedLifePrice
        const days = savedLife / 60 / 60 / 24;
        const hours = savedLife / 60 / 60;
        const minutes = savedLife / 60;
        this.mounted && this.setState(prevState => ({
            savedDays: (prevState.savedDays + days),
            savedHours: (prevState.savedHours + hours),
            savedMinutes: (prevState.savedMinutes + minutes),
            savedSeconds: (prevState.savedSeconds + secondsBetweenDates)
        }));
        setInterval(this.calculateSavedLife.bind(this, user), 1000);
    }


    calculateSavedLife =(user=false) => {
        const currentUser = user || this.state.currentUser;
        const OneCigaretLifeprice = 11 * 60;
        const smokingCigaretPerSec = (currentUser.cigaretsPerDay / 86400);
        const savedLifePerSec = OneCigaretLifeprice * smokingCigaretPerSec;
        const test = savedLifePerSec * 1000;
        const days = savedLifePerSec / 60 / 60 / 24;
        const hours = savedLifePerSec / 60 / 60;
        const minutes = savedLifePerSec / 60;
        this.mounted && this.setState(prevState => ({
            savedDays: (prevState.savedDays + days),
            savedHours: (prevState.savedHours + hours),
            savedMinutes: (prevState.savedMinutes + minutes),
            savedSeconds: (prevState.savedSeconds + savedLifePerSec)
        }));
    }


    calculateDifferenceDatesnoSmokingCigarets = (user=false) => {
        const currentUser = user || this.state.currentUser;
        const oneCigaretPrice = (currentUser.price / currentUser.cigaretsPerDay);
        const setUpDate = this.state.currentUser.firstSetupDate;
        let convertedSetUpDate = new Date(setUpDate);
        let today = new Date();
        let milisecondsDifference = today.getTime() - convertedSetUpDate.getTime();
        let secondsDifference = milisecondsDifference / 1000;
        let secondsBetweenDates = Math.abs(secondsDifference);
        const smokingCigaretPerSec = (currentUser.cigaretsPerDay / 86400);
        const numberOfNotSmokingCigarets = smokingCigaretPerSec * secondsBetweenDates;
        this.setState(prevState => ({
            notSmokingCigarets: prevState.notSmokingCigarets + numberOfNotSmokingCigarets
        }))
        setInterval(this.calculateNotSmokingCiagrets.bind(this, user), 1000);
    }



    calculateNotSmokingCiagrets = (user=false) => {
        const currentUser = user || this.state.currentUser;
        const smokingCigaretPerSec = (currentUser.cigaretsPerDay / 86400);
        this.mounted && this.setState(prevState => ({
            notSmokingCigarets: prevState.notSmokingCigarets + smokingCigaretPerSec
        }));
    }

    calculateDifferenceHowLongYouDontSmoke = (user=false) => {
        const currentUser = user || this.state.currentUser;
        const setUpDate = this.state.currentUser.firstSetupDate;
        let convertedSetUpDate = new Date(setUpDate);
        let today = new Date();
        let milisecondsDifference = today.getTime() - convertedSetUpDate.getTime();
        let days = milisecondsDifference / 1000 / 60 / 60 /24;
        let hours = milisecondsDifference / 1000 / 60 / 60;
        let minutes = milisecondsDifference / 1000 / 60;
        let seconds = milisecondsDifference / 1000;
        this.setState(prevState => ({
            noSmokingDays: days,
            noSmokingHours: hours,
            noSmokingMinutes: minutes,
            noSmokingSeconds: seconds
        }))
    }
    



    render() {
        return(
            <div className="container">
                <div className="users">
                    <div className="users__item users_item--saved-life">
                        <img className="users__img users__img--save-money" src={saveMoneyImg} alt="money image" />
                        <h3 className="users__title">ile zaoszczędziłeś pieniędzy?</h3>
                        <p className="users__info paragraph-small">{parseMoney(this.state.savedMoney)} zł</p>
                    </div>
                    <div className="users__item users_item-saved-life">
                        <img className="users__img users__img--save-life" src={saveLifeImg} alt="heart image" />
                        <h3 className="users__title">o ile będziesz dłużej żył?</h3>
                        <div class="users__container-info users__container-info-expansion">
                            <p className="users__info paragraph-small"> {parseDays(this.state.savedDays)} dni</p>
                            <p className="users__info paragraph-small">{parseDays(this.state.savedHours)} godzin</p>
                            <p className="users__info paragraph-small">{parseDays(this.state.savedMinutes)} minut</p >
                            <p className="users__info paragraph-small">{parseDays(this.state.savedSeconds)} sekund</p>
                        </div>
                    </div>
                    <div className="users__item users_item--no-smoked-cigarets">
                        <img className="users__img users__img--saved-cigarets" src={noSmokingImg} alt="cigaret image" />   
                        <h3 className="users__title">ile papierosów udało Ci się nie zapalić?</h3>
                        <p className="users__info paragraph-small">{parseNumber(this.state.notSmokingCigarets)} papierosa</p>
                    </div>
                    <div className="users__item users_item--no-smoking-time">
                        <img className="users__img users__img--save-money" src={TimeImg} alt="clock image" />
                        <h3 className="users__title">Jak długo już nie palisz?</h3>
                        <div class="users__container-info users__container-info-expansion">
                            <p className="users__info paragraph-small"> {parseDays(this.state.noSmokingDays)} dni</p>
                            <p className="users__info paragraph-small">{parseDays(this.state.noSmokingHours)} godzin</p>
                            <p className="users__info paragraph-small">{parseDays(this.state.noSmokingMinutes)} minut</p >
                            <p className="users__info paragraph-small">{parseDays(this.state.noSmokingSeconds)} sekund</p>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}

export default UserInfoPage;