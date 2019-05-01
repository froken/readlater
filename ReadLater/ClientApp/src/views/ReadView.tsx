import * as React from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import ReadLayout from '../layouts/read-layout';
import ReadList from '../containers/ReadList';
import {Grid} from '@material-ui/core';

export default class ReadView extends React.Component<{}, {}> {
    render() {
        return <ReadLayout children={<ReadList />} />;
    }
}
