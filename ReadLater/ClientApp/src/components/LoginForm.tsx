import * as React from 'react';
import { createRef } from 'react';
import {
    FormControl,
    InputAdornment,
    IconButton,
    FormGroup,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import history from '../history';

export interface IDispatchProps {
    login: (userName: string, password: string) => {};
}

export interface IState {
    userName: string | undefined;
    password: string | undefined;
    showPassword: boolean;
    validation: {
        userName: string | undefined;
        password: string | undefined;
    };
}

export class LoginForm extends React.Component<IDispatchProps, IState> {
    userNameRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;
    isValidForm: boolean;

    public constructor(props: IDispatchProps) {
        super(props);

        this.state = {
            password: '',
            userName: '',
            showPassword: false,
            validation: {
                userName: undefined,
                password: undefined,
            },
        };

        this.isValidForm = false;
        this.userNameRef = createRef<HTMLInputElement>();
        this.passwordRef = createRef<HTMLInputElement>();

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getRefValue = this.getRefValue.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.redirectToRegister = this.redirectToRegister.bind(this);
        this.validate = this.validate.bind(this);
    }

    public getRefValue(ref: React.RefObject<HTMLInputElement>) {
        return ref && ref.current ? ref.current.value : undefined;
    }

    public validate(
        userName: string | undefined,
        password: string | undefined
    ) {
        const { validation } = this.state;

        //validation.userName = Validator.validateUserName(userName);
        //validation.password = Validator.validatePassword(password);

        this.isValidForm = !validation.userName && !validation.password;
        this.setState((state: IState) => ({ ...state, validation }));
    }

    public handleLogin(event: any) {
        event.preventDefault();

        const userName = this.getRefValue(this.userNameRef);
        const password = this.getRefValue(this.passwordRef);

        this.validate(userName, password);

        if (this.isValidForm) {
            this.props.login(userName as string, password as string);
        }
    }

    public handleChange(event: any) {
        const { name, value } = event.target;
        this.setState((state: IState) => ({ ...state, [name]: value }));
    }

    public handleClickShowPassword() {
        this.setState(state => ({ ...state, showPassword: !state.showPassword }));
    }

    public redirectToRegister() {
        history.push('/register');
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
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        variant="outlined"
                                        label="User Name"
                                        value={this.state.userName}
                                        inputRef={this.userNameRef}
                                        helperText={
                                            this.state.validation.userName
                                        }
                                        error={
                                            this.state.validation.userName
                                                ? true
                                                : false
                                        }
                                        onChange={this.handleChange}
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
                                    value={this.state.password}
                                    inputRef={this.passwordRef}
                                    helperText={this.state.validation.password}
                                    error={
                                        this.state.validation.password
                                            ? true
                                            : false
                                    }
                                    onChange={this.handleChange}
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
                                style={{ marginTop: '20px' }}>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleLogin}>
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={this.redirectToRegister}
                                    >
                                        Register
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
