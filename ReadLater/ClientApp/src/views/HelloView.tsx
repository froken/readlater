import * as React from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import Layout from '../layouts/Layout';
import Hello from '../containers/Hello';

export interface IProps extends WithStyles<typeof styles> {
    children: React.ReactNode
}

const styles = (theme: any) => ({
    root: {
    }
});

export class HelloView extends React.Component<IProps, {}> {
    render() {
         return (
            <Layout children={<Hello></Hello>}></Layout>
        );
    }
}

export default withStyles(styles, {withTheme: true})(HelloView);
