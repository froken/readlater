import * as React from 'react';
import {
    List as MaterialList,
    ListItem,
    ListItemText,
    withStyles,
    WithStyles,
    createStyles,
    Theme,
    Grid,
} from '@material-ui/core';
import {List} from 'immutable';
import {ReadItem} from '../models/read-item';
import ReadCard from './ReadCard';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center',
            alignItems: 'left',
            height: '100%',
            flexDirection: 'column',
            padding: theme.spacing.unit * 2,
            paddingLeft: 200,
        },
    });

export interface IDispatchProps {
    getReadList: () => {};
}

export interface IProps extends WithStyles<typeof styles> {}

export interface IState {}

export interface IPropsFromState {
    readList: List<ReadItem>;
}

export class ReadList extends React.Component<
    IProps & IDispatchProps & IPropsFromState,
    IState
> {
    constructor(props: IProps & IDispatchProps & IPropsFromState) {
        super(props);
    }

    componentDidMount() {
        this.props.getReadList();
    }

    render() {
        const {classes} = this.props;
        const items = this.props.readList.map(item => {
            return <ReadCard item={item} key={item.itemId} />;
        });

        return (
            <Grid container className={classes.root}>
                {items}
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ReadList);
