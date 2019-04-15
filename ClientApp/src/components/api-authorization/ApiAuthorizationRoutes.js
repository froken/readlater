import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Login } from './Login'
import { Logout } from './Logout'
import { ApplicationPaths, LoginActions, LogoutActions } from './ApiAuthorizationConstants';
import SignIn from './SignIn';

export default class ApiAuthorizationRoutes extends Component {
    constructor(props) {
        super(props);
    }

  render () {
    return(
        <Fragment>
          <Route path={ApplicationPaths.Login} component={SignIn} />
          <Route path={ApplicationPaths.LoginFailed} render={() => loginAction(LoginActions.LoginFailed)} />
          <Route path={ApplicationPaths.LoginCallback} render={() => loginAction(LoginActions.LoginCallback)} />
          <Route path={ApplicationPaths.Profile} render={() => loginAction(LoginActions.Profile)} />
          <Route path={ApplicationPaths.Register} render={(props) => loginAction(LoginActions.Register, props.location)} />
          <Route path={ApplicationPaths.LogOut} render={(props) => logoutAction(LogoutActions.Logout, props.location)} />
          <Route path={ApplicationPaths.LogOutCallback} render={() => logoutAction(LogoutActions.LogoutCallback)} />
          <Route path={ApplicationPaths.LoggedOut} render={() => logoutAction(LogoutActions.LoggedOut)} />
      </Fragment>);
  }
}

function loginAction(name, location){
    return (<Login action={name} location={location}></Login>);
}

function logoutAction(name, location) {
    return (<Logout action={name} location={location}></Logout>);
}
