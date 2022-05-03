import React, { FC } from 'react';
import './MyCoursesPage.css';
import CourseList from '../../components/CourseList/CourseList';

interface MyCoursesPageProps {

}

const MyCoursesPage: FC<MyCoursesPageProps> = () => (
  <div className="MyCoursesPage" data-testid="MyCoursesPage">
      <CourseList my={true}/>
  </div>
);

export default MyCoursesPage;
