import * as React from 'react';
import {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {
    ApplicationPaths,
    QueryParameterNames,
} from '../services/auth-constants';

export interface IState {
}

export interface IProps {
    path: string;
    component: React.ComponentType<any>;
}

export interface IStateProps {
    isAuthenticated: boolean;
}

export interface IDispatchProps {
    authenticate: () => any;
}

export class AuthorizeRoute extends Component<IProps & IStateProps & IDispatchProps, IState> {
    constructor(props: IProps & IStateProps & IDispatchProps) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.props.authenticate();
    }
   
    render() {
        const redirectUrl = `${ApplicationPaths.Login}?${
            QueryParameterNames.ReturnUrl
        }=${encodeURI(window.location.href)}`;

        const C: React.ComponentType<any> = this.props.component;
        const {component: Component, path} = this.props;
        return (
            <Route
                path={path}
                render={props => {
                    if (this.props.isAuthenticated) {
                        return (
                            <div>
                                <C></C>
                            </div>
                        );
                    } else {
                        return <Redirect to={redirectUrl} />;
                    }
                }}
            />
        );
    }
}
