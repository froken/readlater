import * as React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import AppRoutes from './containers/AppRoutes';
import './App.css';

export default class App extends React.Component<{}, {}> {
    public render() {

        return (
            <MuiThemeProvider theme={theme}>
                <AppRoutes></AppRoutes>
            </MuiThemeProvider>
        );
    }
}
