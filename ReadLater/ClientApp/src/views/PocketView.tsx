import * as React from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import Layout from '../layouts/Layout';

export interface IProps extends WithStyles<typeof styles> {
    children: React.ReactNode
}

const styles = (theme: any) => ({
    root: {
    }
});

export class PocketView extends React.Component<IProps, {}> {
    render() {
         return (
            <Layout children={<h1>Read list</h1>}></Layout>
        );
    }
}

export default withStyles(styles, {withTheme: true})(PocketView);
