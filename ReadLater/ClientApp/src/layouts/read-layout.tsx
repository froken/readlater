import * as React from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import Menu from '../components/Menu';
import Grid from '@material-ui/core/Grid';

export interface IProps extends WithStyles<typeof styles> {
    theme: any;
    children: React.ReactNode;
}

export interface IState {}

const styles = (theme: any) => ({
    root: {
        alignItems: 'stretch',
    },
    header: {},
    content: {},
    footer: {},
});

export class ReadLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const {classes, children} = this.props;

        return (
            <Grid container className={classes.root} direction="column">
                <Grid item className={classes.header}>
                    <Menu displaySearch={true} />
                </Grid>
                <Grid item className={classes.content}>
                    {children}
                </Grid>
                <Grid item className={classes.footer}>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ReadLayout);
