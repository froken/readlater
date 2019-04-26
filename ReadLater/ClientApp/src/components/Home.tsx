import * as React from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Paper} from '@material-ui/core';

export interface IProps extends WithStyles<typeof styles> {
    theme: any;
}

export interface IState {
    open: boolean;
}


const styles = (theme: any) => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
});

export class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    }

    handleDrawerOpen() {
        this.setState({open: true});
    }

    handleDrawerClose() {
        this.setState({open: false});
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        This is a sheet of paper.
                    </Typography>
                    <Typography component="p">
                        Paper can be used to build surface or other elements for
                        your application.
                    </Typography>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Home);
