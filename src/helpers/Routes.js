import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthScreen from '../views/authScreen';
import Players from '../views/teamView';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};

export default function Routes({ user, players, setPlayers }) {
  return (
    <div>
      <Switch>
        <Route
          exact path='/'
          component={() => <AuthScreen />}
        />
        <PrivateRoute
          path='/players'
          user={user}
          component={() => <Players user={user} players={players} setPlayers={setPlayers} />} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired,
  user: PropTypes.any
};
