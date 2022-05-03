import React, { FC } from 'react';
import './AddCoursePage.css';
import AddCourseForm from '../../components/AddCourseForm/AddCourseForm';

interface AddCoursePageProps {}

const AddCoursePage: FC<AddCoursePageProps> = () => (
  <div className="AddCoursePage" data-testid="AddCoursePage">
    <AddCourseForm />
  </div>
);

export default AddCoursePage;
