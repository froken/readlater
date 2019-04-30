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

const styles = (theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',
        },
        hello: {
            textAlign: 'center',
        },
        login: {
            marginTop: theme.spacing.unit * 5,
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
            return (
                <Grid container className={classes.root}>
                    <Grid item>
                        <ListItem button>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    </Grid>
                </Grid>
            );
        });

        return <MaterialList component="nav">{items}</MaterialList>;
    }
}

export default withStyles(styles, {withTheme: true})(ReadList);
