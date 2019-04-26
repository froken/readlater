import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LayoutBody from './LayoutBody';
import Paper from '@material-ui/core/Paper';
import AppAppBar from './AppBar';

const styles = (theme: any) => ({
  root: {
    display: 'flex',
    backgroundImage: 'url(/static/onepirate/appCurvyLines.png)',
    backgroundRepeat: 'no-repeat',
  },
  paper: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 8}px`,
    },
  },
});

function AppForm(props: any) {
  const { children, classes } = props;

  return (
    <div className={classes.root}>
        <AppAppBar></AppAppBar>
      <LayoutBody margin marginBottom width="small">
        <Paper className={classes.paper}>{children}</Paper>
      </LayoutBody>
    </div>
  );
}

AppForm.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppForm);