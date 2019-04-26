import * as React from 'react';
import {User} from '../models/user';
import {
    Grid,
    FormGroup,
    Card,
    TextField,
    FormControl,
    CardContent,
    InputAdornment,
    IconButton,
    Button,
    ButtonBase,
} from '@material-ui/core';
import {VisibilityOff, Visibility} from '@material-ui/icons';
import history from '../history';

export interface IState {
    user: User;
    showPassword: boolean;
    validation: {
        email: string | undefined;
        password: string | undefined;
        userName: string | undefined;
    };
}

export interface IDispatchProps {
    register: (user: User) => void;
}

export class RegisterForm extends React.Component<IDispatchProps, IState> {
    formIsValid: boolean;

    public constructor(props: IDispatchProps) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: '',
                userName: '',
            },
            showPassword: false,
            validation: {
                userName: undefined,
                password: undefined,
                email: undefined,
            },
        };

        this.formIsValid = false;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.validate = this.validate.bind(this);
    }

    public validate(name: string, value: string | undefined) {
        let {validation} = this.state;

        //validation = {...validation, [name]: Validator.Validate(name, value)};

        // this.setState((state: IState) => {
        //     return {...state, validation};
        // });

        this.formIsValid =
            this.state.validation.userName ||
            this.state.validation.email ||
            this.state.validation.password
                ? false
                : true;
    }

    public onChange(event: any) {
        const {name, value} = event.target;
        const user = {...this.state.user, [name]: value};

        this.setState((state: IState) => {
            return {...state, user};
        });

        this.validate(name, value);
    }

    public onSubmit(e: any) {
        e.preventDefault();
        this.validate('userName', this.state.user.userName);
        this.validate('email', this.state.user.email);
        this.validate('password', this.state.user.password);

        if (!this.formIsValid) {
            return;
        }

        this.props.register(this.state.user);
    }

    public handleClickShowPassword() {
        this.setState(state => ({...state, showPassword: !state.showPassword}));
    }

    public redirectToLogin() {
        history.push(`/login`);
    }

    public render() {
        return (
            <Grid container justify="center">
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        id="email"
                                        name="email"
                                        type="email"
                                        variant="outlined"
                                        label="Email"
                                        value={this.state.user.email}
                                        helperText={this.state.validation.email}
                                        error={
                                            this.state.validation.email
                                                ? true
                                                : false
                                        }
                                        onChange={this.onChange}
                                    />
                                </FormControl>
                                <br />
                                <FormControl>
                                    <TextField
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        variant="outlined"
                                        label="User Name"
                                        value={this.state.user.userName}
                                        helperText={
                                            this.state.validation.userName
                                        }
                                        error={
                                            this.state.validation.userName
                                                ? true
                                                : false
                                        }
                                        onChange={this.onChange}
                                    />
                                </FormControl>
                                <br />
                                <TextField
                                    id="filled-adornment-password"
                                    variant="outlined"
                                    name="password"
                                    type={
                                        this.state.showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    label="Password"
                                    value={this.state.user.password}
                                    helperText={this.state.validation.password}
                                    error={
                                        this.state.validation.password
                                            ? true
                                            : false
                                    }
                                    onChange={this.onChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                variant="filled"
                                                position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={
                                                        this
                                                            .handleClickShowPassword
                                                    }>
                                                    {this.state.showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormGroup>

                            <Grid
                                container
                                spacing={8}
                                alignItems="flex-end"
                                justify="center"
                                style={{marginTop: '20px'}}>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.onSubmit}
                                        disabled={
                                            this.state.validation.email ||
                                            this.state.validation.password ||
                                            this.state.validation.userName
                                                ? true
                                                : false
                                        }>
                                        Register
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={this.redirectToLogin}>
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
