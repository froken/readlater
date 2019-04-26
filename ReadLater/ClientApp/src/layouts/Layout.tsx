import * as React from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import AppAppBar from '../components/AppBar';
import Grid from '@material-ui/core/Grid';

export interface IProps extends WithStyles<typeof styles> {
    classes: any;
    theme: any;
    children: React.ReactNode;
}

export interface IState {
    open: boolean;
}

const styles = (theme: any) => ({
    root: {
        margin: 0
    },
    content: {

    }
});

export class Layout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            open: false,
        };
    }

    render() {
        const {classes, children} = this.props;

        return (
            <div className={classes.root}>
                <AppAppBar />
                <Grid container className={classes.root} alignItems="center" justify="center">
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Layout);
