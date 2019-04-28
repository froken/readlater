import * as React from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Theme, createStyles, Grid, Button} from '@material-ui/core';
import pocketService from '../services/pocket-service';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column'
        },
        hello: {
            textAlign: 'center',
        },
        login: {
            marginTop: theme.spacing.unit * 5,
        },
    });

export interface IDispatchProps {
    loginWithPocket: () => {};
}

export interface IState {
}

export interface IProps extends WithStyles<typeof styles> {

}

export class Hello extends React.Component<IProps & IDispatchProps, IState> {
    constructor(props: IProps & IDispatchProps) {
        super(props);
        this.loginWithPocket = this.loginWithPocket.bind(this);
    }

    public loginWithPocket() {
        this.props.loginWithPocket();
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.root}>
                <Grid item>
                    <Typography variant="h1" className={classes.hello}>
                        Hello
                    </Typography>
                </Grid>
                <Grid item className={classes.login}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.loginWithPocket}>
                        Login with pocket
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Hello);
