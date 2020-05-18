import React, {Component} from 'react';
import UserPage from 'components/UserPage';
import UserInfoPage from 'components/UserInfoPage';
import RegistrationForm from 'components/RegistrationForm';
import LoginForm from 'components/LoginForm';
import 'styles/mainStylesheet/mainStylesheet.scss';
import {Switch, Route, Redirect} from 'react-router-dom';
import WithAuthentication from 'components/shared/hoc/withAuthentication';
import withNavbar from 'components/shared/hoc/withNavbar';


class App extends Component {
  render() {
    return(
      <div>
        <Switch>
          <Route path='/dashboard'  component={(WithAuthentication(withNavbar(UserInfoPage)))}/>
          <Route path='/registration' component={RegistrationForm} />
          <Route path='/addicition-form' component={WithAuthentication(withNavbar(UserPage))}/>
          <Route path="/login" component={LoginForm} />
          <Route exact path="/" render={() => (
            <Redirect to="/login"/>
          )}/>
        </Switch>
      </div>
    )
  }
}

/*
wyodrebnic wszystkie funkcje (side-effecty), ktore uderzaja do API, do jakiegos pliku, np. [nazwa-uslugi]Service
*/

export default App;
