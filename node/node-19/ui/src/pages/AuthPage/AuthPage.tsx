import * as React from 'react';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AuthForm from '../../components/AuthForm/AuthForm';

const theme = createTheme();

export default function AuthPage() {

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <AuthForm />
            </Container>
        </ThemeProvider>
    );
}
