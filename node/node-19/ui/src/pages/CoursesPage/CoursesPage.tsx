import React, { FC } from 'react';
import './CoursesPage.css';
import CourseList from '../../components/CourseList/CourseList';

interface CoursesPageProps {}

const CoursesPage: FC<CoursesPageProps> = () => (
  <div className="CoursesPage" data-testid="CoursesPage">
    <CourseList/>
  </div>
);

export default CoursesPage;
