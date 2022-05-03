import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import useMutationUserReg from '../../hooks/user/useMutationUserReg';
import {Link as RouterLink} from 'react-router-dom';
import {FormHelperText} from '@mui/material';
import {IRegData} from '../../fetches/types';

export default function RegForm() {

    const [registered, setRegistered] = useState(false);
    const [registerError, setRegisterError] = useState<string | undefined>();

    const {mutate: putUserReg, isLoading} = useMutationUserReg((result) => {
        if (result.success) {
            setRegistered(true);
        } else {
            setRegisterError(result.errorMessage)
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params: IRegData = {
            email: data.get('email') as string,
            password: data.get('password') as string,
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
        };
        const repassword: string = data.get('repassword') as string;
        if (repassword === params.password) {
            putUserReg(params);
        } else {
            setRegisterError('Пароли не совпадают')
        }
    };

    return (
        <>
            <CssBaseline />
            {registered &&
            <Box>
                <Typography>
                    <p>Поздравляем! Теперь вы можете войти со своим именем и паролем!</p>
                    <p>
                        <Link component={RouterLink} to="/auth">
                            Перейти на страницу входа
                        </Link>
                    </p>
                </Typography>
            </Box>
            }
            {!registered &&
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="firstName"
                        label="Имя"
                        id="firstName"
                        autoComplete="first-name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="Фамилия"
                        id="lastName"
                        autoComplete="last-name"
                    />
                    <TextField
                        margin="normal"
                        required
                        type="password"
                        fullWidth
                        name="password"
                        label="Пароль"
                        id="password"
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        type="password"
                        fullWidth
                        name="repassword"
                        label="Повторите пароль"
                        id="repassword"
                        autoComplete="re-password"
                    />

                    {registerError &&
                    <FormHelperText sx={{color: 'red', textAlign: 'center'}}>
                        {registerError}
                    </FormHelperText>
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={isLoading}
                    >
                        Отправить
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to="/auth">
                                Уже зарегистрированы? Войти тут
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            }
        </>
    );
}
