import * as React from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import Layout from '../layouts/Layout';
import ReadList from '../containers/ReadList';
import {Grid} from '@material-ui/core';

export default class ReadView extends React.Component<{}, {}> {
    render() {
        return <Layout children={<ReadList />} />;
    }
}
