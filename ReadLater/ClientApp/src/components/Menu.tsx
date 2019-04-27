import * as React from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {
    Toolbar,
    AppBar,
    Typography,
    InputBase,
    Theme,
    createStyles,
    WithStyles,
} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing.unit,
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing.unit * 9,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        inputInput: {
            paddingTop: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 10,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
    });

export interface IProps extends WithStyles<typeof styles> {}

function Menu(props: IProps) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        color="inherit"
                        noWrap
                    />
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Menu);
