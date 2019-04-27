import * as React from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import Menu from '../components/Menu';
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
        height: '100%',
        minHeight: '100%',
        alignItems: 'stretch'
    },
    header: {
        flexGrow: 0
    },
    content: {
        flexGrow: 1
    },
    footer: {
        flexGrow: 0
    },
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
            <Grid container className={classes.root} direction="column">
                <Grid item className={classes.header}>
                    <Menu />
                </Grid>
                <Grid item className={classes.content}>
                    {children}
                </Grid>
                <Grid item className={classes.footer}>
                    Footer
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Layout);
