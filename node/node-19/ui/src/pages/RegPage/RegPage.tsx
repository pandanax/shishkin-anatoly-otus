import * as React from 'react';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import RegForm from '../../components/RegForm/RegForm';

const theme = createTheme();

export default function RegPage() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <RegForm />
            </Container>
        </ThemeProvider>
    );
}
