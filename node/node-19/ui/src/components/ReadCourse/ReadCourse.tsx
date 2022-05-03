import React, {FC} from 'react';
import './ReadCourse.css';
import {useParams} from 'react-router-dom';
import useQueryCourse from '../../hooks/course/useQueryCourse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Typography} from '@mui/material';
import Divider from '@mui/material/Divider';

interface ReadCourseProps {
}

const ReadCourse: FC<ReadCourseProps> = () => {
    const {id} = useParams();
    const {data: course, isLoading: isCourseLoading, isSuccess: isCourseSuccess} = useQueryCourse(id as string);

    return <div className="ReadCourse" data-testid="ReadCourse">
        {isCourseSuccess && <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography variant={'h3'} sx={{marginBottom: 2}}>
                    {course.title}
                </Typography>
                <Divider />
                <Typography variant={'body1'} sx={{marginTop: 2}}>
                    {course.description}
                </Typography>
            </CardContent>
        </Card>}
    </div>
};

export default ReadCourse;
