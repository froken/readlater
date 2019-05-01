import * as React from 'react';
import {
    withStyles,
    WithStyles,
    Typography,
    Link,
    Theme,
    createStyles,
} from '@material-ui/core';
import {ReadItem} from '../models/read-item';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing.unit * 2
        },
        title: {
        },
        link: {
            fontFamily: 'Roboto',
        },
    });

export interface IProps extends WithStyles<typeof styles> {
    item: ReadItem;
}

export interface IState {
    hover: boolean;
}

export interface IPropsFromState {}

export interface IDispatchProps {}

export class ReadCard extends React.Component<
    IProps & IDispatchProps & IPropsFromState,
    IState
> {
    constructor(props: IProps & IDispatchProps & IPropsFromState) {
        super(props);

        this.state = {
            hover: false,
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h6" className={classes.title}>
                    {this.props.item.title}
                </Typography>

                <Link href={this.props.item.url} className={classes.link}>
                    {this.props.item.url}
                </Link>

                <Typography>{this.props.item.description}</Typography>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ReadCard);
