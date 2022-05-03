import React, {FC} from 'react';
import './CourseList.css';
import useQueryCourses from '../../hooks/course/useQueryCourses';
import CourseCard from '../CourseCard/CourseCard';
import {ICourse} from '../../entities/course';
import List from '@mui/material/List';
import {Link, Typography} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@mui/material/Button';

interface CourseListProps {
    my?: boolean
}

const CourseList: FC<CourseListProps> = ({my}) => {
    const {isLoading, data, error} = useQueryCourses(my);
    return (
        <>
            {my && <Button sx={{minWidth: 100}}>
                <Link component={RouterLink} to="/add">
                    Добавить курс
                </Link>
            </Button>}
            <div className="CourseList" data-testid="CourseList">
                {data && data.length > 0 && <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {data.map((c: ICourse, i: number) => (
                        <CourseCard key={i} course={c} my={my} />
                    ))}
                </List>}
            </div>
            {data && my && data.length === 0 && <Typography>
                У вас пока нет курсов
            </Typography>}
        </>
    )
}

export default CourseList;
