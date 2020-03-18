import React, {Component} from 'react';
import NavBar from 'components/NavBar';
import UserPage from 'components/UserPage';
import UserInfoPage from 'components/UserInfoPage';
import RegistrationForm from 'components/RegistrationForm';
import LoginForm from 'components/LoginForm';
import 'styles/mainStylesheet/mainStylesheet.scss';
import {Switch, Route} from 'react-router-dom';
import WithAuthentication from 'components/WithAuthentication';





class App extends Component {
  render() {
    return(
      <div>
        <Switch>
          <Route path='/dashboard'  component={WithAuthentication(UserInfoPage)}/>
          {/*<Route path='/dashboard'  component={UserInfoPage}/>*/}
          <Route path='/registration' component={RegistrationForm} />
          <Route path='/addicition-form' component={WithAuthentication(UserPage)} />
          {/*<Route path='/addicition-form' component={UserPage} />*/}
          <Route exact path='/login' component={LoginForm} />
        </Switch>
      </div>
    )
  }
}

//zadanie domowe - opanuj flexa i zrób layout


export default App;
