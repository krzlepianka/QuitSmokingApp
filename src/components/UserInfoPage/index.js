import React from 'react';
import { setInterval } from 'timers';
import parseNumber from 'helpers/parseNum';
import parseMoney from 'helpers/parseMoney';
import parseDays from 'helpers/parseDays';
import saveMoneyImg from '../../styles/images/money.png';
import saveLifeImg from '../../styles/images/heart.png';
import noSmokingImg from '../../styles/images/smoking.png';
import TimeImg from '../../styles/images/history.png';


class UserInfoPage extends React.Component {

    state = {
        currentUser: {},
        savedMoney: 0,
        savedLifeDay: 0,
        savedLifeHour: 0,
        savedLifeMin: 0,
        savedLifeSec: 0,
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
            setInterval(this.calculateSavedMoneyPerSecond, 1000);
            setInterval(this.calculateSavedLifePerSecond, 1000);
            setInterval(this.calculateNumberOfNotSmokingCiarets, 1000);
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

    calculateSavedMoneyPerSecond= (user=false) => {
        try {
            const currentUser = user || this.state.currentUser;
            if (!currentUser) {
                throw new Error("Cannot calculate saved money without currentUser in state or passed in argument");
            }
            const oneDayInSeconds = 86400;      
            const cigaretsSmokedPerDay = currentUser.cigaretsPerDay;       
            const cigaretsSmokedPerSecond = (cigaretsSmokedPerDay/oneDayInSeconds).toFixed(5);     
            const setUpDate = currentUser.firstSetupDate;  
            const convertedSetupDate = new Date(setUpDate);      
            const today = new Date();      
            const timePassedfromQuitSmoking = (today.getTime() - convertedSetupDate.getTime()) / 1000;
            const savedMoney = cigaretsSmokedPerSecond * timePassedfromQuitSmoking;
            this.mounted && this.setState({
                savedMoney
            })
        } catch(error) {
            console.error(error);
        }
    }

    calculateSavedLifePerSecond = (user=false) => {
        try{
            const currentUser = user || this.state.currentUser;
            if(!currentUser) {
                throw new Error("Cannot calculate saved money without currentUser in state or passed in argument");
            }   
            const setUpDate = currentUser.firstSetupDate;  
            const convertedSetupDate = new Date(setUpDate);      
            const today = new Date();      
            const timePassedfromQuitSmoking = (today.getTime() - convertedSetupDate.getTime()) / 1000;
            const oneDayInSeconds = 86400;      
            const cigaretsSmokedPerDay = currentUser.cigaretsPerDay;       
            const cigaretsSmokedPerSecond = (cigaretsSmokedPerDay/oneDayInSeconds).toFixed(5); 
            const wastedLifeByOneCigaret = 660;
            const savedLifeSec = (wastedLifeByOneCigaret * cigaretsSmokedPerSecond) * timePassedfromQuitSmoking;
            const savedLifeMin = (savedLifeSec / 60);
            const savedLifeHour = (savedLifeMin / 60);
            const savedLifeDay  = (savedLifeHour / 24);
            this.mounted && this.setState({
                savedLifeSec,
                savedLifeMin,
                savedLifeHour,
                savedLifeDay
            })
        }
        catch(error) {
            console.log(error);
        }
    }


    calculateNumberOfNotSmokingCiarets = (user=false) => {
        try {
            const currentUser = user || this.state.currentUser; 
            if(!currentUser) {
                throw new Error("Cannot calculate saved money without currentUser in state or passed in argument")
            }
            const setUpDate = currentUser.firstSetupDate;  
            const convertedSetupDate = new Date(setUpDate); 
            const oneDayInSeconds = 86400;     
            const today = new Date();      
            const timePassedfromQuitSmoking = (today.getTime() - convertedSetupDate.getTime()) / 1000;
            const cigaretsSmokedPerDay = currentUser.cigaretsPerDay; 
            const notSmokingCigarets = ((cigaretsSmokedPerDay * timePassedfromQuitSmoking) / oneDayInSeconds);
            this.mounted && this.setState({
                notSmokingCigarets
            })
        }
        catch(error) {
            console.log(error);
        }
    }

    calculateDifferenceHowLongYouDontSmoke = (user=false) => {
        try{
            const currentUser = this.state.currentUser || user;
            if(!currentUser) {
                throw new Error("Cannot calculate saved money without currentUser in state or passed in argument")
            }
            const setUpDate = currentUser.firstSetupDate;
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
        catch(error) {
            console.log(error);
        }
    }
    
    render() {
        return(
            <div className="container">
                <div className="users">
                    <div className="users__item users_item--saved-life">
                        <img className="users__img users__img--save-money" src={saveMoneyImg} alt="money" />
                        <h3 className="users__title">ile zaoszczędziłeś pieniędzy?</h3>
                        <p className="users__info paragraph-small">{parseMoney(this.state.savedMoney)} zł</p>
                    </div>
                    <div className="users__item users_item-saved-life">
                        <img className="users__img users__img--save-life" src={saveLifeImg} alt="heart" />
                        <h3 className="users__title">o ile będziesz dłużej żył?</h3>
                        <div className="users__container-info users__container-info-expansion">
                            <p className="users__info paragraph-small"> {parseDays(this.state.savedLifeDay)} dni</p>
                            <p className="users__info paragraph-small">{parseDays(this.state.savedLifeHour)} godzin</p>
                            <p className="users__info paragraph-small">{parseDays(this.state.savedLifeMin)} minut</p >
                            <p className="users__info paragraph-small">{parseDays(this.state.savedLifeSec)} sekund</p>
                        </div>
                    </div>
                    <div className="users__item users_item--no-smoked-cigarets">
                        <img className="users__img users__img--saved-cigarets" src={noSmokingImg} alt="cigaret" />   
                        <h3 className="users__title">ile papierosów udało Ci się nie zapalić?</h3>
                        <p className="users__info paragraph-small">{parseNumber(this.state.notSmokingCigarets)} papierosa</p>
                    </div>
                    <div className="users__item users_item--no-smoking-time">
                        <img className="users__img users__img--save-money" src={TimeImg} alt="clock" />
                        <h3 className="users__title">Jak długo już nie palisz?</h3>
                        <div className="users__container-info users__container-info-expansion">
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