import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {FormHelperText} from '@mui/material';
import useMutationCourseAdd from '../../hooks/course/useMutationCourseAdd';

export default function AddCourseForm() {

    const [error, setError] = useState<string | boolean>(false);

    const {mutate: addCourse, isLoading, isSuccess} = useMutationCourseAdd((result) => {
        if (result.success) {
            //setRegistered(true);
        } else {
            setError(String(result.errorMessage))
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params = {
            title: data.get('title') as string,
            description: data.get('description') as string,
        };
        addCourse(params);
    };

    return (
        <>
            <CssBaseline />
            {!isSuccess && (<Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Добавить курс
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1, width: '100%'}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Название"
                            name="title"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            multiline
                            fullWidth
                            maxRows={10}
                            rows={5}
                            name="description"
                            label="Описание"
                            id="description"
                        />

                        {error &&
                        <FormHelperText sx={{color: 'red', textAlign: 'center'}}>
                            {error}
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

                    </Box>
                </Box>
            )}
            {isSuccess && (
              <Typography component="h1" variant="h5">
                  Курс Добавлен!
              </Typography>
            )}
        </>
    );
}
