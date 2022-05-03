import React, {FC, useEffect, useState} from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import './CourseCard.css';
import {ICourse} from '../../entities/course';
import {IUser} from '../../entities/user';
import {Button, ListItemButton} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import useQueryCurrentUser from '../../hooks/user/useQueryCurrentUser';

interface CourseCardProps {
    course: ICourse
    my?: boolean
}

const CourseCard: FC<CourseCardProps> = ({course, my}) => {
    const {data: user, isSuccess} = useQueryCurrentUser();

    const [access, setAccess] = useState(false);

    useEffect(() => {
        if (isSuccess && course && user) {
            const isAccessGranted = !!(course.accessUserIds && course.accessUserIds.map(({email}: IUser) => email).includes(user.email));
            setAccess(isAccessGranted);
        }
    }, [course, user, isSuccess])


    return <>
        <ListItem alignItems="flex-start" data-testid="CourseCard">
            <ListItemText
                primary={course.title}
                secondary={
                    <React.Fragment>
                        {course.description && <Typography
                            sx={{display: 'inline'}}
                            component="span"
                            color="text.primary"
                            variant={'caption'}
                        >
                            {course.description.slice(0, 100)}
                        </Typography>}
                        <br />
                        <Typography component="span"
                        >
                            {course.userId && course.userId.firstName}
                            &nbsp;
                            {course.userId && course.userId.lastName}
                            &nbsp;
                            {course.userId && <span>({course.userId.email})</span>}
                        </Typography>
                    </React.Fragment>
                }
            />
            {my && <ListItemButton>
                <Button>
                    <Link component={RouterLink} to={`/edit/${course.id}`}>
                        Редактировать
                    </Link>
                </Button>
            </ListItemButton>}
            {!my && access && <ListItemButton>
                <Button>
                    <Link component={RouterLink} to={`/read/${course.id}`}>
                        Открыть
                    </Link>
                </Button>
            </ListItemButton>}
        </ListItem>
        <Divider variant="inset" component="li" />
    </>
};
export default CourseCard;

