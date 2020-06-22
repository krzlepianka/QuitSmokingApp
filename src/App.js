import React, {Component} from 'react';
import 'styles/mainStylesheet/mainStylesheet.scss';
import {Switch, Route, Redirect} from 'react-router-dom';
import { uid } from 'react-uid';
import routesArray from './routes/index';


class App extends Component {
  render() {
    const routes = routesArray.map(({path, component, exact, redirect}) => {
      if (redirect) {
        return (
          <Route key={uid({ path, redirect })} exact path={path} render={() => (
            <Redirect to={redirect} />
          )} />
        );
      }
      return <Route key={uid({ path, component })} exact={exact} path={path} component={component} />
    })
    return(
      <div>
        <Switch>
          {routes}
        </Switch>
      </div>
    )
  }
}

export default App;
