import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {FormHelperText} from '@mui/material';
import useMutationCourseEdit from '../../hooks/course/useMutationCourseEdit';
import useQueryCourse from '../../hooks/course/useQueryCourse';
import {useParams} from 'react-router-dom';
import {IUser} from '../../entities/user';

export default function EditCourseForm() {

    const {id} = useParams();

    const [error, setError] = useState<string | boolean>(false);

    const {data: course, isLoading: isCourseLoading, isSuccess: isCourseSuccess} = useQueryCourse(id as string);
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [access, setAccess] = useState<string>('');

    useEffect(() => {
        if (isCourseSuccess) {
            setTitle(course.title)
            setDesc(course.description)
            setAccess(course.accessUserIds.map(({email}: IUser) => email).join('\n'))
        }
    }, [
        isCourseSuccess
    ])


    const {mutate: editCourse, isLoading, isSuccess} = useMutationCourseEdit((result) => {
        if (result.success) {
            //setRegistered(true);
        } else {
            setError(String(result.errorMessage))
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const acc = data.get('access') as string;
        const params = {
            title: data.get('title') as string,
            description: data.get('description') as string,
            access: acc.replace(' ','').split('\n') as string[],
            id,
        };
        editCourse(params);
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
                        Изменить курс
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
                            value={title}
                            onChange={e => setTitle(e.target.value)}
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
                            value={desc}
                            onChange={e => setDesc(e.target.value)}

                        />
                        <TextField
                            margin="normal"
                            required
                            multiline
                            fullWidth
                            maxRows={10}
                            rows={5}
                            name="access"
                            label="Доступ (email, по одному в каждой строке)"
                            id="access"
                            value={access}
                            onChange={e => setAccess(e.target.value)}

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
                    Курс Изменен!
                </Typography>
            )}
        </>
    );
}
