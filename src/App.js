import React, {Component} from 'react';
import 'styles/mainStylesheet/mainStylesheet.scss';
import {Switch, Route, Redirect} from 'react-router-dom';
import routes from './routes/index';


class App extends Component {
  render() {
    const testRoutes = routes.map(({path, component, exact}) => {
      return <Route exact={exact} path={path} component={component} />
    })
    return(
      <div>
        <Switch>
          {testRoutes}
          {/*<Route path='/dashboard'  component={(WithAuthentication(withNavbar(UserInfoPage)))}/>
          <Route path='/registration' component={RegistrationForm} />
          <Route path='/addicition-form' component={WithAuthentication(withNavbar(UserPage))}/>
          <Route path="/login" component={LoginForm} />
          <Route exact path="/" render={() => (
            <Redirect to="/login"/>
          )}/>*/}
        </Switch>
      </div>
    )
  }
}

/*
wyodrebnic wszystkie funkcje (side-effecty), ktore uderzaja do API, do jakiegos pliku, np. [nazwa-uslugi]Service
*/

export default App;
