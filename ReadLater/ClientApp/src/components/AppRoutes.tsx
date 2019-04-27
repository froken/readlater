import * as React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import LoginForm from '../containers/LoginForm';
import RegisterForm from '../containers/RegisterForm';
import {MuiThemeProvider} from '@material-ui/core/styles';
import history from '../history';
import theme from '../theme';
import HelloView from '../views/HelloView';

export interface IState {}

export interface IProps {}

export interface IStateProps {
    isAuthenticated: boolean;
}

export interface IDispatchProps {
    authenticate: () => any;
}

export class AppRoutes extends React.Component<IProps & IStateProps & IDispatchProps, {}> {
    constructor(props: IProps & IStateProps & IDispatchProps) {
        super(props);
    }

    componentDidMount() {
        this.props.authenticate();
    }

    public render() {
        let authorizedRoutes: any;

        if (this.props.isAuthenticated) {
            authorizedRoutes = <Route path="/" component={HelloView} />;
        } else {
            authorizedRoutes = '';
        }

        return (
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                        <Switch>
                            <Route path="/login" component={LoginForm} />
                            <Route path="/register" component={RegisterForm} />
                            {authorizedRoutes}
                        </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}
