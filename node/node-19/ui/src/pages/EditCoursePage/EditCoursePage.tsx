import React, { FC } from 'react';
import './EditCoursePage.css';
import EditCourseForm from '../../components/EditCourse/EditCourse';

interface EditCoursePageProps {
}

const EditCoursePage: FC<EditCoursePageProps> = () => (
  <div className="EditCoursePage" data-testid="EditCoursePage">
    <EditCourseForm />
  </div>
);

export default EditCoursePage;
