import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });

export default class App extends React.Component {
  static displayName = App.name;

    render() {
    
        return (
            <MuiThemeProvider theme={theme}>
                <Button>Hello</Button>

                <form noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Name"
          value="some"
          margin="normal"
        />
        </form>
            </MuiThemeProvider>
        );
  }
}
